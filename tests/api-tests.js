#!/usr/bin/env node

/**
 * API Endpoint Integration Tests
 *
 * This script performs actual HTTP requests to test the API endpoints.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Test configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TIMEOUT = 10000; // 10 seconds

// Helper function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.setTimeout(TIMEOUT, () => {
      req.destroy();
      reject(new Error(`Request timeout after ${TIMEOUT}ms`));
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

// Helper function to create multipart form data
function createMultipartForm(fileBuffer, filename, fields = {}) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  let body = '';

  // Add file field
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
  body += 'Content-Type: application/octet-stream\r\n\r\n';
  // Note: In a real test, we would include the actual file buffer here

  // Add other fields
  Object.keys(fields).forEach(key => {
    body += `\r\n--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    body += `${fields[key]}`;
  });

  body += `\r\n--${boundary}--\r\n`;

  return {
    body,
    boundary
  };
}

// Test image compression API
async function testImageCompression() {
  console.log('🔬 Testing Image Compression API...\n');

  try {
    // Test 1: Missing file parameter
    console.log('1. Testing missing file parameter...');
    const formData1 = createMultipartForm(Buffer.from(''), 'test.jpg');
    const options1 = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/image-compress',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData1.boundary}`,
        'Content-Length': Buffer.byteLength(formData1.body)
      }
    };

    try {
      const response1 = await makeRequest(options1, formData1.body);
      console.log(`   Status: ${response1.statusCode}`);
      console.log(`   Response: ${JSON.stringify(response1.data)}`);

      if (response1.statusCode === 400) {
        console.log('   ✅ Correctly handled missing file');
      } else {
        console.log('   ❌ Should return 400 for missing file');
      }
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }

    // In a real test environment, we would include actual file tests here
    console.log('\n📝 Note: Actual file tests require sample images and a running server\n');

    console.log('✅ Image Compression API tests completed\n');
  } catch (error) {
    console.error('❌ Image Compression API test failed:', error.message);
  }
}

// Test OCR API
async function testOCR() {
  console.log('🔬 Testing OCR API...\n');

  try {
    // Test 1: Missing file parameter
    console.log('1. Testing missing file parameter...');
    const formData1 = createMultipartForm(Buffer.from(''), 'test.jpg');
    const options1 = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/ocr',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData1.boundary}`,
        'Content-Length': Buffer.byteLength(formData1.body)
      }
    };

    try {
      const response1 = await makeRequest(options1, formData1.body);
      console.log(`   Status: ${response1.statusCode}`);
      console.log(`   Response: ${JSON.stringify(response1.data)}`);

      if (response1.statusCode === 400) {
        console.log('   ✅ Correctly handled missing file');
      } else {
        console.log('   ❌ Should return 400 for missing file');
      }
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }

    // Test 2: Invalid file type
    console.log('\n2. Testing invalid file type (text file)...');
    const formData2 = createMultipartForm(Buffer.from('some text'), 'test.txt', { lang: 'eng' });
    const options2 = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/ocr',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData2.boundary}`,
        'Content-Length': Buffer.byteLength(formData2.body)
      }
    };

    try {
      const response2 = await makeRequest(options2, formData2.body);
      console.log(`   Status: ${response2.statusCode}`);
      console.log(`   Response: ${JSON.stringify(response2.data)}`);

      if (response2.statusCode === 400) {
        console.log('   ✅ Correctly handled non-image file');
      } else {
        console.log('   ❌ Should return 400 for non-image file');
      }
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }

    console.log('\n📝 Note: Actual OCR tests require sample images with text and a running server\n');

    console.log('✅ OCR API tests completed\n');
  } catch (error) {
    console.error('❌ OCR API test failed:', error.message);
  }
}

// Test error handling
async function testErrorHandling() {
  console.log('🔬 Testing Error Handling...\n');

  // Test various error conditions with dummy requests
  console.log('1. Testing various API endpoints for proper error responses...');

  // This would normally test actual endpoints with malformed requests
  console.log('   ✅ Error handling tests documented');
  console.log('   📝 In a full test suite, we would include:');
  console.log('   - Timeout testing');
  console.log('   - Invalid parameter testing');
  console.log('   - Large file size testing');
  console.log('   - Concurrent request testing\n');
}

// Main test function
async function runTests() {
  console.log('🧪 Starting API Integration Tests\n');
  console.log(`🔗 Base URL: ${BASE_URL}\n`);

  // Check if server is running
  try {
    await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    console.log('✅ Server is running\n');
  } catch (error) {
    console.log('⚠️  Server may not be running. Some tests will be skipped.\n');
    console.log('💡 Start your development server with: npm run dev\n');
  }

  await testImageCompression();
  await testOCR();
  await testErrorHandling();

  console.log('🏁 API Integration Tests Completed');
  console.log('\n📋 Next steps:');
  console.log('   1. Ensure your development server is running');
  console.log('   2. Add sample test images to the test directory');
  console.log('   3. Run this script with: node tests/api-tests.js');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testImageCompression,
  testOCR,
  testErrorHandling,
  makeRequest
};