# OCR API Test Plan

## Overview
This document outlines the test plan for the OCR (Optical Character Recognition) API endpoint located at `/api/ocr`.

## Test Scenarios

### 1. Successful OCR Processing
- **Test Case 1.1**: Process clear English text image
- **Test Case 1.2**: Process French text image
- **Test Case 1.3**: Process image with mixed fonts
- **Test Case 1.4**: Process image with small text
- **Test Case 1.5**: Process image with large text
- **Test Case 1.6**: Process image with rotated text
- **Test Case 1.7**: Process image with low contrast
- **Test Case 1.8**: Process image with colored background
- **Test Case 1.9**: Process image with handwritten text
- **Test Case 1.10**: Process image with printed text

### 2. Language Support Testing
- **Test Case 2.1**: Process English text with 'eng' language parameter
- **Test Case 2.2**: Process French text with 'fra' language parameter
- **Test Case 2.3**: Process Spanish text with 'spa' language parameter
- **Test Case 2.4**: Process German text with 'deu' language parameter
- **Test Case 2.5**: Default language handling (no language parameter)

### 3. Error Handling
- **Test Case 3.1**: No file provided in request
- **Test Case 3.2**: Non-image file provided (PDF, TXT, etc.)
- **Test Case 3.3**: Invalid language parameter
- **Test Case 3.4**: Corrupted image file
- **Test Case 3.5**: Image with no text
- **Test Case 3.6**: Image with illegible text

### 4. Boundary Conditions
- **Test Case 4.1**: Very small image (1x1 pixel)
- **Test Case 4.2**: Very large image file
- **Test Case 4.3**: Zero-byte file
- **Test Case 4.4**: Image with extremely dense text
- **Test Case 4.5**: Image with sparse text

### 5. Performance Testing
- **Test Case 5.1**: Response time for simple text images
- **Test Case 5.2**: Response time for complex layout images
- **Test Case 5.3**: Response time for high-resolution images
- **Test Case 5.4**: Concurrent OCR requests handling

## Expected Results

### Success Cases
- Valid image files should be processed and text extracted
- Response should include:
  - `text`: Extracted text content
  - `confidence`: Overall confidence score (0-100)
  - `words`: Count of recognized words

### Error Cases
- Status 400 for missing file
- Status 400 for non-image files
- Status 500 for processing errors
- Appropriate error messages in JSON format

## Test Data Requirements
- Sample images with text in various languages
- Images with different fonts, sizes, and styles
- Various image sizes (small, medium, large)
- Invalid files (PDF, TXT)
- Corrupted image files
- Images with no text content

## Test Execution Steps
1. Prepare test data files
2. Execute each test case using curl or similar tool
3. Verify response status codes
4. Validate response content (text extraction accuracy)
5. Check confidence scores
6. Document results and any anomalies

## Tools Needed
- curl or Postman for API testing
- Text comparison tools to verify OCR accuracy
- Sample images with known text content for validation