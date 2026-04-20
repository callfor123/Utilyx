# Image Compression UI Component Test Plan

## Overview
This document outlines the test plan for validating the Image Compression UI component located at `src/components/tools/image/img-compress.tsx`.

## Component Features
- File upload via drag & drop or file selection
- Image compression using browser-image-compression library
- Quality adjustment slider (10-100%)
- Output format selection (original, WebP, JPG)
- Before/after image comparison slider
- File size comparison and savings calculation
- Download compressed image functionality

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
- **Test Case 2.3**: File type display
- **Test Case 2.4**: Original file size display
- **Test Case 2.5**: Image preview loads correctly

### 3. Quality Adjustment
- **Test Case 3.1**: Quality slider moves smoothly (10-100%)
- **Test Case 3.2**: Quality value updates correctly
- **Test Case 3.3**: Minimum value (10%) selectable
- **Test Case 3.4**: Maximum value (100%) selectable
- **Test Case 3.5**: Default quality set to 80%

### 4. Output Format Selection
- **Test Case 4.1**: "Format original" option works
- **Test Case 4.2**: "WebP" format option works
- **Test Case 4.3**: "JPG" format option works
- **Test Case 4.4**: Format selection persists between compressions

### 5. Compression Functionality
- **Test Case 5.1**: Compress button triggers compression
- **Test Case 5.2**: Loading state displays during compression
- **Test Case 5.3**: Compressed image displays after processing
- **Test Case 5.4**: File size comparison updates
- **Test Case 5.5**: Savings percentage calculates correctly
- **Test Case 5.6**: Toast notification shows on success
- **Test Case 5.7**: Toast notification shows on error

### 6. Before/After Comparison
- **Test Case 6.1**: Comparison slider displays both images
- **Test Case 6.2**: Slider moves smoothly with mouse
- **Test Case 6.3**: Slider moves with touch gestures
- **Test Case 6.4**: Original and compressed labels display
- **Test Case 6.5**: Image aspect ratio maintained

### 7. Download Functionality
- **Test Case 7.1**: Download button triggers download
- **Test Case 7.2**: Downloaded file has correct name
- **Test Case 7.3**: Downloaded file has correct extension based on format
- **Test Case 7.4**: Toast notification shows on download

### 8. Reset Functionality
- **Test Case 8.1**: Reset button clears all state
- **Test Case 8.2**: File upload area reappears after reset
- **Test Case 8.3**: Object URLs are properly revoked

### 9. Error Handling
- **Test Case 9.1**: Invalid file type shows error toast
- **Test Case 9.2**: Compression error shows error toast
- **Test Case 9.3**: Large file handling (if applicable)

### 10. Responsive Design
- **Test Case 10.1**: Component displays correctly on mobile
- **Test Case 10.2**: Component displays correctly on tablet
- **Test Case 10.3**: Component displays correctly on desktop
- **Test Case 10.4**: Slider works on touch devices

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations
- Compression speed for different image sizes
- Memory usage during compression
- UI responsiveness during processing

## Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Proper focus management
- Color contrast compliance

## Test Data Requirements
- Various image formats (JPG, PNG, GIF, WebP)
- Different image sizes (small, medium, large)
- Different aspect ratios
- Invalid file types for error testing

## Test Execution Steps
1. Navigate to the image compression tool page
2. Execute each test case above
3. Verify UI behavior matches expectations
4. Check console for any errors
5. Document results and any anomalies

## Tools Needed
- Browser developer tools
- Sample images in various formats
- Network throttling tools for performance testing