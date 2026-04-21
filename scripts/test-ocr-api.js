#!/usr/bin/env node

/**
 * OCR API Test Script
 *
 * This script tests the OCR API endpoint with actual HTTP requests.
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_IMAGES_DIR = path.join(__dirname, '../test-images');

// Test data
const testCases = [
  {
    name: 'English text image with default language',
    file: 'sample.png',
    params: {}
  },
  {
    name: 'English text image with explicit English language',
    file: 'sample.png',
    params: { lang: 'eng' }
  },
  {
    name: 'English text image with French language',
    file: 'sample.png',
    params: { lang: 'fra' }
  },
  {
    name: 'English text image with Spanish language',
    file: 'sample.png',
    params: { lang: 'spa' }
  }
];

// Error test cases
const errorTestCases = [
  {
    name: 'No file provided',
    file: null,
    params: {}
  },
  {
    name: 'Non-image file',
    file: 'sample.txt',
    params: {}
  }
];

async function createTestFile(filename, content = 'test content') {
  const filePath = path.join(TEST_IMAGES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
  return filePath;
}

async function testSuccessfulOCR() {
  console.log('🔍 Testing Successful OCR Processing...\n');

  for (const testCase of testCases) {
    console.log(`🔹 Testing: ${testCase.name}`);

    try {
      // Create form data manually
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);
      let body = '';

      // Add file if provided
      if (testCase.file) {
        const filePath = path.join(TEST_IMAGES_DIR, testCase.file);
        if (fs.existsSync(filePath)) {
          const fileBuffer = fs.readFileSync(filePath);

          body += `--${boundary}\r\n`;
          body += `Content-Disposition: form-data; name="file"; filename="${testCase.file}"\r\n`;
          body += `Content-Type: image/png\r\n\r\n`;
          body += fileBuffer.toString('binary');
          body += `\r\n`;
        }
      }

      // Add parameters
      Object.keys(testCase.params).forEach(key => {
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
        body += `${testCase.params[key]}\r\n`;
      });

      body += `--${boundary}--\r\n`;

      const response = await fetch(`${BASE_URL}/api/ocr`, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(body, 'binary')
        },
        body: Buffer.from(body, 'binary')
      });

      if (response.ok) {
        console.log(`   ✅ Success - Status: ${response.status}`);
        const result = await response.json();
        console.log(`   📝 Text length: ${result.text ? result.text.length : 0} characters`);
        console.log(`   📊 Confidence: ${result.confidence}`);
        console.log(`   🔤 Words: ${result.words}\n`);
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Failed - Status: ${response.status}`);
        console.log(`   💬 Error: ${errorText}\n`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }
}

async function testErrorHandling() {
  console.log('🔧 Testing Error Handling...\n');

  // Create a sample text file for testing non-image files
  await createTestFile('sample.txt', 'This is not an image file');

  for (const testCase of errorTestCases) {
    console.log(`🔸 Testing: ${testCase.name}`);

    try {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);
      let body = '';

      // Add file if provided
      if (testCase.file) {
        const filePath = path.join(TEST_IMAGES_DIR, testCase.file);
        if (fs.existsSync(filePath)) {
          const fileBuffer = fs.readFileSync(filePath);
          const mimeType = testCase.file.endsWith('.txt') ? 'text/plain' : 'image/png';

          body += `--${boundary}\r\n`;
          body += `Content-Disposition: form-data; name="file"; filename="${testCase.file}"\r\n`;
          body += `Content-Type: ${mimeType}\r\n\r\n`;
          body += fileBuffer.toString('binary');
          body += `\r\n`;
        }
      }

      body += `--${boundary}--\r\n`;

      const response = await fetch(`${BASE_URL}/api/ocr`, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(body, 'binary')
        },
        body: Buffer.from(body, 'binary')
      });

      if (!response.ok) {
        console.log(`   ✅ Correctly failed - Status: ${response.status}`);
        const errorData = await response.json();
        console.log(`   💬 Error message: ${errorData.error}\n`);
      } else {
        console.log(`   ❌ Should have failed but succeeded\n`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }
}

async function runTests() {
  console.log('🚀 Starting OCR API Tests\n');

  await testSuccessfulOCR();
  await testErrorHandling();

  console.log('🏁 OCR API Tests Completed');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testSuccessfulOCR,
  testErrorHandling
};