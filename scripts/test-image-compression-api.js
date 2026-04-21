#!/usr/bin/env node

/**
 * Image Compression API Test Script
 *
 * This script tests the image compression API endpoint with actual HTTP requests.
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_IMAGES_DIR = path.join(__dirname, '../test-images');

// Ensure test images directory exists
if (!fs.existsSync(TEST_IMAGES_DIR)) {
  fs.mkdirSync(TEST_IMAGES_DIR, { recursive: true });
}

// Test data
const testCases = [
  {
    name: 'PNG image with default quality',
    file: 'sample.png',
    params: {}
  },
  {
    name: 'PNG image with quality 50%',
    file: 'sample.png',
    params: { quality: '50' }
  },
  {
    name: 'PNG image with quality 95%',
    file: 'sample.png',
    params: { quality: '95' }
  },
  {
    name: 'PNG image with WebP format',
    file: 'sample.png',
    params: { format: 'webp' }
  },
  {
    name: 'PNG image with JPEG format',
    file: 'sample.png',
    params: { format: 'jpeg' }
  },
  {
    name: 'PNG image with width resize',
    file: 'sample.png',
    params: { width: '200' }
  },
  {
    name: 'PNG image with height resize',
    file: 'sample.png',
    params: { height: '200' }
  },
  {
    name: 'PNG image with both width and height resize',
    file: 'sample.png',
    params: { width: '200', height: '200' }
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

class File {
  constructor(buffer, filename, type) {
    this.buffer = buffer;
    this.filename = filename;
    this.type = type;
  }

  arrayBuffer() {
    return Promise.resolve(this.buffer);
  }
}

async function testSuccessfulCompression() {
  console.log('🧪 Testing Successful Image Compression...\n');

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

      const response = await fetch(`${BASE_URL}/api/image-compress`, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(body, 'binary')
        },
        body: Buffer.from(body, 'binary')
      });

      if (response.ok) {
        console.log(`   ✅ Success - Status: ${response.status}`);
        console.log(`   📦 Content-Type: ${response.headers.get('content-type')}`);
        console.log(`   📏 Original-Size: ${response.headers.get('x-original-size')}`);
        console.log(`   🗃️  Compressed-Size: ${response.headers.get('x-compressed-size')}`);
        console.log(`   🎨 Format: ${response.headers.get('x-format')}\n`);
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

      const response = await fetch(`${BASE_URL}/api/image-compress`, {
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
  console.log('🚀 Starting Image Compression API Tests\n');

  await testSuccessfulCompression();
  await testErrorHandling();

  console.log('🏁 Image Compression API Tests Completed');
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testSuccessfulCompression,
  testErrorHandling
};