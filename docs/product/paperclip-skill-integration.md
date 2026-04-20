# Paperclip Skill Integration Guide

## Overview

This guide explains how to integrate new AI skills with the Paperclip automation system. Paperclip provides a framework for scheduling, executing, and monitoring AI-powered tasks across the Utilyx platform.

## Prerequisites

Before integrating a skill with Paperclip, ensure you have:
- A working skill implementation following the standard skill structure
- Understanding of the skill's input/output requirements
- Access to necessary API keys or credentials
- Knowledge of the skill's resource requirements

## Integration Steps

### 1. Skill Registration

Register your skill with Paperclip by adding it to the skill registry:

```javascript
// In paperclip/registry.js
const skillRegistry = {
  'skill-name': {
    name: 'Human-readable Name',
    description: 'Brief description of what the skill does',
    schedule: 'cron-expression-or-event-trigger',
    handler: require('../skills/skill-name/handler'),
    config: {
      // Skill-specific configuration
    }
  }
};
```

### 2. Handler Implementation

Create a handler function that Paperclip can call:

```javascript
// In skills/skill-name/handler.js
module.exports = async function(paperclipContext) {
  try {
    // Extract parameters from context
    const { inputData, config } = paperclipContext;
    
    // Execute skill logic
    const result = await executeSkill(inputData, config);
    
    // Return standardized result
    return {
      success: true,
      data: result,
      metrics: {
        executionTime: Date.now() - startTime,
        resourceUsage: getResourceUsage()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
};
```

### 3. Configuration

Define configuration options for your skill:

```yaml
# In paperclip/config/skill-name.yaml
skill-name:
  enabled: true
  schedule: "0 */4 * * *"  # Every 4 hours
  timeout: 300  # 5 minutes
  retries: 3
  concurrency: 1
  parameters:
    # Skill-specific parameters
```

### 4. Monitoring and Logging

Implement proper logging for Paperclip integration:

```javascript
// In skills/skill-name/logger.js
const logger = require('../../paperclip/logger');

module.exports = {
  logExecution: (taskId, status, details) => {
    logger.info('Skill execution', {
      taskId,
      skill: 'skill-name',
      status,
      timestamp: new Date().toISOString(),
      ...details
    });
  },
  
  logError: (taskId, error) => {
    logger.error('Skill error', {
      taskId,
      skill: 'skill-name',
      error: error.message,
      stack: error.stack
    });
  }
};
```

## Scheduling Options

### Cron-based Scheduling

Use standard cron expressions for recurring tasks:

```javascript
// Examples
const schedules = {
  hourly: '0 * * * *',           // Every hour
  daily: '0 0 * * *',            // Daily at midnight
  weekly: '0 0 * * 0',           // Weekly on Sunday
  monthly: '0 0 1 * *',          // Monthly on first day
  custom: '*/30 * * * *'         // Every 30 minutes
};
```

### Event-based Triggers

Trigger skills based on system events:

```javascript
const triggers = {
  onUserAction: 'user.action.completed',
  onDataUpdate: 'data.updated',
  onSchedule: 'schedule.daily.report'
};
```

## Resource Management

### Memory and CPU Limits

Specify resource requirements for your skill:

```javascript
// In skills/skill-name/resources.js
module.exports = {
  memory: '512MB',    // Recommended memory allocation
  cpu: '0.5',         // CPU cores (0.5 = half core)
  timeout: 300,       // Execution timeout in seconds
  concurrent: 2       // Max concurrent executions
};
```

### Rate Limiting

Implement rate limiting to prevent overwhelming external services:

```javascript
// In skills/skill-name/ratelimit.js
const rateLimit = require('some-rate-limiting-library');

module.exports = rateLimit({
  windowMs: 60000,    // 1 minute
  max: 10,            // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this skill, please try again later."
});
```

## Error Handling

Implement comprehensive error handling:

```javascript
// In skills/skill-name/error-handler.js
module.exports = {
  handle: (error, context) => {
    // Log the error
    logger.error('Skill error occurred', {
      skill: context.skillName,
      error: error.message,
      input: context.input,
      timestamp: new Date().toISOString()
    });
    
    // Determine error type and response
    if (error.code === 'VALIDATION_ERROR') {
      return { retry: false, message: 'Invalid input data' };
    } else if (error.code === 'TIMEOUT_ERROR') {
      return { retry: true, delay: 60000 }; // Retry after 1 minute
    } else {
      return { retry: true, delay: 5000 }; // Retry after 5 seconds
    }
  }
};
```

## Testing

### Unit Tests

Write unit tests for your skill handler:

```javascript
// In skills/skill-name/__tests__/handler.test.js
describe('Skill Handler', () => {
  test('should execute successfully with valid input', async () => {
    const context = {
      inputData: { /* mock data */ },
      config: { /* mock config */ }
    };
    
    const result = await handler(context);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
  
  test('should handle errors gracefully', async () => {
    const context = {
      inputData: { /* invalid data */ },
      config: { /* mock config */ }
    };
    
    const result = await handler(context);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### Integration Tests

Test the Paperclip integration:

```javascript
// In paperclip/__tests__/integration/skill-name.test.js
describe('Paperclip Skill Integration', () => {
  test('should register skill correctly', () => {
    const registry = require('../../registry');
    expect(registry['skill-name']).toBeDefined();
    expect(registry['skill-name'].handler).toBeInstanceOf(Function);
  });
  
  test('should execute skill through Paperclip scheduler', async () => {
    // Mock scheduler execution
    const result = await paperclip.execute('skill-name', testData);
    expect(result.success).toBe(true);
  });
});
```

## Deployment

### Environment Variables

Set required environment variables:

```bash
# In .env or deployment configuration
PAPERCLIP_SKILL_NAME_ENABLED=true
PAPERCLIP_SKILL_NAME_SCHEDULE="0 */4 * * *"
PAPERCLIP_SKILL_NAME_TIMEOUT=300
```

### Health Checks

Implement health check endpoints:

```javascript
// In skills/skill-name/health.js
module.exports = {
  check: async () => {
    try {
      // Perform basic health check
      await performBasicOperation();
      return { healthy: true };
    } catch (error) {
      return { 
        healthy: false, 
        error: error.message 
      };
    }
  }
};
```

## Best Practices

1. **Design for Failure**
   - Assume services will be unavailable
   - Implement graceful degradation
   - Use circuit breaker patterns

2. **Monitor Performance**
   - Track execution times
   - Monitor resource consumption
   - Set up alerting for anomalies

3. **Documentation**
   - Keep README files updated
   - Document configuration options
   - Provide usage examples

4. **Security**
   - Validate all inputs
   - Handle credentials securely
   - Implement proper authentication

5. **Scalability**
   - Design stateless handlers
   - Use connection pooling
   - Implement caching where appropriate

## Troubleshooting

### Common Issues

1. **Skill Not Executing**
   - Check if skill is registered
   - Verify scheduling configuration
   - Review Paperclip logs

2. **Timeout Errors**
   - Increase timeout values
   - Optimize skill performance
   - Consider breaking into smaller tasks

3. **Resource Exhaustion**
   - Monitor memory usage
   - Adjust concurrency settings
   - Implement better resource management

### Debugging

Enable debug logging for detailed information:

```bash
PAPERCLIP_DEBUG=true
PAPERCLIP_LOG_LEVEL=debug
```

Check logs at `/var/log/paperclip/debug.log` for detailed execution information.