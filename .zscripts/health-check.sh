#!/bin/bash
# Health check endpoint pour monitoring externe
# Utilyx DevOps

SITE="utilyx.app"
OUTPUT_FILE="/tmp/utilyx-health.json"

# Check HTTP
start=$(date +%s%3N)
http_code=$(curl -s -o /dev/null -w "%{http_code}" "https://$SITE/" --max-time 10 -L --connect-timeout 5)
end=$(date +%s%3N)
latency=$((end - start))

# Timestamp UTC
timestamp=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

# Status
if [[ "$http_code" =~ ^(200|301|302|307)$ ]]; then
    status="ok"
else
    status="degraded"
fi

# Output JSON
cat > "$OUTPUT_FILE" << JSON
{
  "site": "$SITE",
  "status": "$status",
  "httpCode": $http_code,
  "latencyMs": $latency,
  "timestamp": "$timestamp"
}
JSON

echo "Status: $status | HTTP: $http_code | Latency: ${latency}ms"
cat "$OUTPUT_FILE"
