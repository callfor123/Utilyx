const fs = require('fs');
const path = require('path');

async function testOCR() {
  const BASE_URL = 'http://localhost:3000';
  const TEST_IMAGES_DIR = path.join(__dirname, '../test-images');

  console.log('Testing OCR API with a single image...');

  try {
    // Create form data manually
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).slice(2);
    let body = '';

    // Add file
    const filePath = path.join(TEST_IMAGES_DIR, 'sample.png');
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);

      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="file"; filename="sample.png"\r\n`;
      body += `Content-Type: image/png\r\n\r\n`;
      body += fileBuffer.toString('binary');
      body += `\r\n`;
    }

    // Add language parameter
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="lang"\r\n\r\n`;
    body += `eng\r\n`;

    body += `--${boundary}--\r\n`;

    console.log('Sending request to OCR API...');

    const response = await fetch(`${BASE_URL}/api/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body, 'binary')
      },
      body: Buffer.from(body, 'binary')
    });

    console.log(`Response status: ${response.status}`);

    if (response.ok) {
      const result = await response.json();
      console.log('OCR Result:');
      console.log(`Text: ${result.text ? result.text.substring(0, 100) + '...' : 'No text found'}`);
      console.log(`Confidence: ${result.confidence}`);
      console.log(`Words: ${result.words}`);
    } else {
      const errorText = await response.text();
      console.log(`Error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testOCR();