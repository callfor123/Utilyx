# OCR UI Component Test Plan

## Overview
This document outlines the test plan for validating the OCR (Optical Character Recognition) UI component located at `src/components/tools/image/img-ocr.tsx`.

## Component Features
- File upload via drag & drop or file selection
- Language selection for OCR processing
- Image preview display
- Text extraction using OCR API
- Confidence score and word count display
- Text editing and download functionality
- Copy to clipboard functionality

## Test Scenarios

### 1. File Upload Functionality
- **Test Case 1.1**: Drag and drop valid image file (JPG)
- **Test Case 1.2**: Drag and drop valid image file (PNG)
- **Test Case 1.3**: Drag and drop valid image file (GIF)
- **Test Case 1.4**: Click to browse and select image file
- **Test Case 1.5**: Drag and drop non-image file (PDF)
- **Test Case 1.6**: Drag and drop multiple files (should use first image)
- **Test Case 1.7**: Cancel file selection dialog

### 2. Image Display and Information
- **Test Case 2.1**: Image dimensions display correctly
- **Test Case 2.2**: File name display
- **Test Case 2.3**: File size display
- **Test Case 2.4**: Image preview loads correctly
- **Test Case 2.5**: Image preview maintains aspect ratio
- **Test Case 2.6**: Background pattern for transparency visualization

### 3. Language Selection
- **Test Case 3.1**: Default language set to English ('eng')
- **Test Case 3.2**: Change language to French ('fra')
- **Test Case 3.3**: Change language to Spanish ('spa')
- **Test Case 3.4**: Change language to German ('deu')
- **Test Case 3.5**: Change language to Italian ('ita')
- **Test Case 3.6**: Change language to Portuguese ('por')
- **Test Case 3.7**: Change language to Dutch ('nld')
- **Test Case 3.8**: Change language to Russian ('rus')

### 4. OCR Processing Functionality
- **Test Case 4.1**: Process button triggers OCR API call
- **Test Case 4.2**: Loading state displays during processing
- **Test Case 4.3**: API request includes correct file and language parameters
- **Test Case 4.4**: Successful response populates OCR result
- **Test Case 4.5**: Confidence score displays correctly
- **Test Case 4.6**: Word count displays correctly
- **Test Case 4.7**: Toast notification shows on success
- **Test Case 4.8**: Toast notification shows on error

### 5. OCR Result Display
- **Test Case 5.1**: Extracted text displays in textarea
- **Test Case 5.2**: Textarea is editable
- **Test Case 5.3**: Confidence badge displays percentage
- **Test Case 5.4**: Word count badge displays number
- **Test Case 5.5**: Textarea uses monospace font for readability

### 6. Text Actions
- **Test Case 6.1**: Copy button copies text to clipboard
- **Test Case 6.2**: Download button downloads text file
- **Test Case 6.3**: Downloaded file has correct name based on original image
- **Test Case 6.4**: Downloaded file has .txt extension
- **Test Case 6.5**: Toast notification shows on copy success
- **Test Case 6.6**: Toast notification shows on download success

### 7. Reset Functionality
- **Test Case 7.1**: Reset button clears all state
- **Test Case 7.2**: File upload area reappears after reset
- **Test Case 7.3**: Object URLs are properly revoked
- **Test Case 7.4**: All form fields reset to defaults

### 8. Error Handling
- **Test Case 8.1**: Invalid file type shows error toast
- **Test Case 8.2**: OCR API error shows error toast
- **Test Case 8.3**: Network error shows appropriate message
- **Test Case 8.4**: Large file handling (if applicable)

### 9. Responsive Design
- **Test Case 9.1**: Component displays correctly on mobile
- **Test Case 9.2**: Component displays correctly on tablet
- **Test Case 9.3**: Component displays correctly on desktop
- **Test Case 9.4**: Textarea resizes appropriately on different screens

### 10. Accessibility
- **Test Case 10.1**: Keyboard navigation support
- **Test Case 10.2**: Screen reader compatibility
- **Test Case 10.3**: Proper focus management
- **Test Case 10.4**: Color contrast compliance
- **Test Case 10.5**: Label associations for form elements

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations
- OCR processing time for different image sizes
- Memory usage during processing
- UI responsiveness during API calls

## Test Data Requirements
- Various image formats (JPG, PNG, GIF, WebP)
- Images with text in different languages
- Images with clear, readable text
- Images with poor quality or low contrast text
- Images with mixed fonts and sizes
- Different image sizes (small, medium, large)
- Invalid file types for error testing

## Test Execution Steps
1. Navigate to the OCR tool page
2. Execute each test case above
3. Verify UI behavior matches expectations
4. Check console for any errors
5. Document results and any anomalies

## Tools Needed
- Browser developer tools
- Sample images with text in various languages
- Network throttling tools for performance testing
- Clipboard monitoring tools