import type { ToolSeoEntry } from './seo-registry'

/**
 * Per-locale overrides for SEO content.
 * Keys are slugs (same as seoRegistry), values override the French defaults.
 * Missing fields fall back to the French seoRegistry entry.
 */
export type LocaleSeoOverrides = Partial<Pick<ToolSeoEntry, 'title' | 'desc' | 'h1' | 'intro' | 'faq' | 'howTo'>>

export const seoLocaleOverrides: Record<string, Record<string, LocaleSeoOverrides>> = {
  en: {
    'compresser-pdf': {
      title: 'Compress PDF Online Free — Reduce PDF Size',
      desc: 'Reduce your PDF file size up to 80% for free. No signup, 100% local processing in your browser.',
      h1: 'Compress a PDF file online for free',
      intro: 'Our PDF compression tool instantly reduces the size of your documents without visible quality loss. Perfect for emailing files, uploading to websites, or saving storage space. No files are sent to any server — everything runs in your browser.',
      faq: [
        { q: 'How to compress a PDF for free?', a: 'Drag and drop your PDF file into the tool above, choose the compression level, then download the result. Completely free, no signup required.' },
        { q: 'Are my files secure?', a: 'Yes, 100%. All processing happens entirely in your web browser. No files are uploaded to our servers or stored online.' },
        { q: 'What is the maximum file size?', a: 'Since everything is processed locally, there is no strict limit. The only limitation is your device memory.' },
      ],
      howTo: ['Drag your PDF file into the drop zone', 'Choose the compression level', 'Click "Compress" and download the result'],
    },
    'fusionner-pdf': {
      title: 'Merge PDF Online Free — Combine Multiple PDFs',
      desc: 'Merge multiple PDF files into one document in seconds. Free, no signup, local processing.',
      h1: 'Merge multiple PDFs into one file',
      intro: 'Easily combine 2 or more PDF documents into a single file. Reorder pages by drag-and-drop before merging. Perfect for assembling invoices, reports, or administrative documents.',
      faq: [
        { q: 'How to merge PDFs online?', a: 'Add your PDF files to the tool, reorder them as needed, then click Merge. You will get a single combined PDF.' },
        { q: 'How many files can I merge?', a: 'There is no limit to the number of files. Combine as many as you need.' },
      ],
      howTo: ['Add your PDF files', 'Reorder by drag-and-drop', 'Click Merge and download'],
    },
    'pdf-en-images': {
      title: 'Convert PDF to JPG PNG Images Online Free',
      desc: 'Convert each page of your PDF into a high-quality JPG or PNG image. Free, no signup.',
      h1: 'Convert a PDF to JPG or PNG images',
      intro: 'Transform every page of your PDF documents into high-resolution images. Useful for adding pages to presentations, sharing on social media, or editing in photo editing software.',
      faq: [
        { q: 'What format will my images be?', a: 'You can choose between JPG (lightweight) and PNG (maximum quality, transparency possible).' },
        { q: 'Is the quality good?', a: 'Yes, images are generated in high resolution directly in your browser.' },
      ],
      howTo: ['Upload your PDF', 'Choose the output format (JPG or PNG)', 'Download the generated images'],
    },
    'signer-pdf': {
      title: 'Sign PDF Online Free — Electronic Signature',
      desc: 'Sign and annotate your PDF documents directly in the browser. Draw or type your signature. 100% free.',
      h1: 'Sign a PDF document online',
      intro: 'Add your handwritten or typed signature to any PDF document without printing or scanning. Ideal for contracts, purchase orders, and administrative forms.',
      faq: [
        { q: 'Is my signature legally valid?', a: 'Our tool creates a simple signature. For enhanced legal value, use a certified eIDAS electronic signature service.' },
      ],
      howTo: ['Upload your PDF', 'Draw or type your signature', 'Position it on the document and download'],
    },
    'deverrouiller-pdf': {
      title: 'Unlock PDF Online Free — Remove PDF Password',
      desc: 'Remove password protection from your PDF files easily. Free and 100% in your browser.',
      h1: 'Unlock a password-protected PDF',
      intro: 'Have a protected PDF whose password you know? Remove the protection in one click to access it freely. No server upload, everything stays in your browser.',
      faq: [
        { q: 'Can I unlock a PDF without the password?', a: 'No, you need to know the password to unlock it. Our tool removes the protection but does not crack passwords.' },
      ],
      howTo: ['Upload your protected PDF', 'Enter the password', 'Download the unlocked PDF'],
    },
    'proteger-pdf': {
      title: 'Protect PDF Online Free — Add Password to PDF',
      desc: 'Add password protection to your PDF files for free. 100% local processing, no server upload.',
      h1: 'Protect a PDF with a password',
      intro: 'Secure your PDF documents by adding a password. Only people who know the password can open and read your file. No server upload, everything is processed locally.',
      faq: [
        { q: 'What level of protection does this provide?', a: 'Your PDF will require a password to open. Use a strong password for best security.' },
      ],
      howTo: ['Upload your PDF', 'Choose a password', 'Download the protected PDF'],
    },
    'convertir-image': {
      title: 'Image Converter Online Free — WebP, AVIF, JPG, PNG',
      desc: 'Convert images between formats: WebP, AVIF, JPG, PNG, and more. Free, no signup, 100% local.',
      h1: 'Convert images to WebP, AVIF, JPG, PNG',
      intro: 'Convert your images to modern formats like WebP and AVIF for better web performance, or switch between JPG, PNG, and other formats. Everything is processed in your browser.',
      faq: [
        { q: 'Which formats are supported?', a: 'JPG, PNG, WebP, AVIF, BMP, GIF, and more. Convert between any supported format.' },
        { q: 'Why convert to WebP or AVIF?', a: 'WebP and AVIF offer significantly smaller file sizes with similar quality — ideal for web performance.' },
      ],
      howTo: ['Upload your image', 'Choose the output format', 'Download the converted file'],
    },
    'compresser-image': {
      title: 'Compress Image Online Free — Reduce Image Size',
      desc: 'Optimize and reduce image file size without visible quality loss. Free, no signup, local processing.',
      h1: 'Compress an image online for free',
      intro: 'Reduce the file size of your images while maintaining visual quality. Perfect for optimizing website performance, reducing upload times, and saving storage space.',
      faq: [
        { q: 'Will I lose quality?', a: 'Our tool uses smart compression to minimize file size while keeping visual quality. You can adjust the level to your needs.' },
        { q: 'Which formats are supported?', a: 'JPG, PNG, WebP, and AVIF images are supported.' },
      ],
      howTo: ['Upload your image', 'Adjust the compression level', 'Download the optimized image'],
    },
    'redimensionner-image': {
      title: 'Resize Image Online Free — Change Image Dimensions',
      desc: 'Resize images to any dimension while maintaining aspect ratio. Free, no signup, 100% local.',
      h1: 'Resize an image online for free',
      intro: 'Quickly resize your images to specific dimensions. Maintain aspect ratio or set custom width and height. Perfect for social media profiles, thumbnails, and print.',
      faq: [
        { q: 'Can I keep the aspect ratio?', a: 'Yes, the "Lock ratio" option preserves proportions when you change one dimension.' },
        { q: 'What formats are supported?', a: 'JPG, PNG, WebP, AVIF, and most common image formats.' },
      ],
      howTo: ['Upload your image', 'Set the new dimensions', 'Download the resized image'],
    },
    'supprimer-arriere-plan': {
      title: 'Remove Image Background Online Free',
      desc: 'Remove the background from any image automatically. Free, no signup, processed locally in your browser.',
      h1: 'Remove image background online',
      intro: 'Automatically remove the background from your photos. Get a clean cutout with a transparent background — perfect for product photos, profile pictures, and graphic design.',
      faq: [
        { q: 'How does background removal work?', a: 'Our AI-powered tool detects the subject and removes the background automatically. Just upload your image.' },
        { q: 'Is there a size limit?', a: 'For best results, use images under 10MB. Very large images may take longer to process.' },
      ],
      howTo: ['Upload your image', 'The tool automatically removes the background', 'Download the image with transparent background'],
    },
    'heic-vers-jpg': {
      title: 'HEIC to JPG Converter Online Free',
      desc: 'Convert iPhone HEIC photos to JPG format easily. Free, no signup, 100% in your browser.',
      h1: 'Convert HEIC to JPG online',
      intro: 'Convert your iPhone HEIC photos to the universally compatible JPG format. No need for specialized software — everything happens right in your browser.',
      faq: [
        { q: 'What is HEIC?', a: 'HEIC (High Efficiency Image Container) is the default photo format on iPhones. Not all apps and websites support it.' },
        { q: 'Will I lose quality?', a: 'Minimal quality difference. JPG is widely compatible and the conversion preserves high visual quality.' },
      ],
      howTo: ['Upload your HEIC file', 'The tool converts it to JPG', 'Download the JPG file'],
    },
    'generateur-favicon': {
      title: 'Favicon Generator Online Free — Create Favicon & Icons',
      desc: 'Generate favicon.ico and app icons from any image. Free, no signup, 100% local processing.',
      h1: 'Generate a favicon for your website',
      intro: 'Create a favicon.ico and all the icon sizes needed for your website from a single image. Supports ICO, PNG, SVG, and Apple Touch Icon formats.',
      faq: [
        { q: 'What sizes are generated?', a: '16x16, 32x32, 48x48 favicon.ico, plus 180x180 Apple Touch Icon and 192x192 / 512x512 Android icons.' },
      ],
      howTo: ['Upload your image or logo', 'Preview the favicon at each size', 'Download the favicon package'],
    },
    'telecharger-miniature-youtube': {
      title: 'YouTube Thumbnail Downloader Online Free — HD',
      desc: 'Download YouTube video thumbnails in HD and full resolution. Free, no signup, instant download.',
      h1: 'Download YouTube video thumbnails in HD',
      intro: 'Get high-resolution thumbnails from any YouTube video. Just paste the URL and download the thumbnail in HD or original quality.',
      faq: [
        { q: 'What resolutions are available?', a: 'Default (120x90), Medium (320x180), High (480x360), HD (640x360), and Max Resolution (1280x720 or higher).' },
        { q: 'Can I use thumbnails commercially?', a: 'YouTube thumbnails belong to the video creator. Check the video license before using them.' },
      ],
      howTo: ['Paste the YouTube video URL', 'Choose the resolution', 'Download the thumbnail image'],
    },
    'decouper-video': {
      title: 'Trim Video Online Free — Cut Video Clips',
      desc: 'Cut and trim video clips directly in your browser. Free, no signup, 100% local processing.',
      h1: 'Trim a video online for free',
      intro: 'Cut your videos to keep only the parts you need. Set start and end points precisely, then export the clip. Everything runs in your browser — no upload needed.',
      faq: [
        { q: 'What video formats are supported?', a: 'MP4, WebM, MOV, AVI, and most common video formats.' },
        { q: 'Is there a file size limit?', a: 'Since processing is local, the limit depends on your device memory. For best results, use files under 500MB.' },
      ],
      howTo: ['Upload your video', 'Set start and end points', 'Click Trim and download the clip'],
    },
    'compresser-video': {
      title: 'Compress Video Online Free — Reduce Video Size',
      desc: 'Reduce video file size while maintaining quality. Free, no signup, processed locally in your browser.',
      h1: 'Compress a video online for free',
      intro: 'Reduce the file size of your videos without significant quality loss. Adjust the compression level, resolution, and bitrate. All processing happens in your browser.',
      faq: [
        { q: 'How much can I reduce the size?', a: 'Typically 40-70% reduction while maintaining good visual quality. Results vary by video content.' },
        { q: 'Which formats are supported?', a: 'MP4, WebM, MOV, AVI, and other common video formats.' },
      ],
      howTo: ['Upload your video', 'Choose compression settings', 'Download the compressed video'],
    },
    'convertir-video': {
      title: 'Convert Video Online Free — MP4, WebM, MOV',
      desc: 'Convert videos between MP4, WebM, MOV and more. Free, no signup, 100% in your browser.',
      h1: 'Convert video format online for free',
      intro: 'Convert your videos to any popular format: MP4 for compatibility, WebM for web, or MOV for Apple. Everything is processed locally in your browser.',
      faq: [
        { q: 'Which formats can I convert to?', a: 'MP4 (H.264), WebM (VP9), MOV, and AVI are the most common output formats.' },
      ],
      howTo: ['Upload your video', 'Choose the output format', 'Download the converted video'],
    },
    'ajouter-audio-video': {
      title: 'Add Audio to Video Online Free',
      desc: 'Add music or audio track to your video. Free, no signup, 100% local processing.',
      h1: 'Add audio to a video online',
      intro: 'Merge an audio track with your video. Choose to replace or mix the existing audio. Everything runs in your browser.',
      faq: [
        { q: 'Can I keep the original audio?', a: 'Yes, you can choose to mix the new audio with the existing one, or replace it entirely.' },
      ],
      howTo: ['Upload your video', 'Upload your audio file', 'Choose mix or replace, then download'],
    },
    'extraire-audio-video': {
      title: 'Extract Audio from Video Online Free — MP3, WAV',
      desc: 'Extract the audio track from any video as MP3 or WAV. Free, no signup, local processing.',
      h1: 'Extract audio from a video online',
      intro: 'Pull the audio track from any video and save it as MP3 or WAV. Perfect for extracting music, podcasts, or voice recordings from video files.',
      faq: [
        { q: 'What audio formats can I extract?', a: 'MP3 (compressed, smaller) or WAV (lossless, larger). Choose based on your quality needs.' },
      ],
      howTo: ['Upload your video', 'Choose audio format (MP3 or WAV)', 'Download the extracted audio'],
    },
    'video-en-gif': {
      title: 'Video to GIF Converter Online Free',
      desc: 'Convert any video clip to an animated GIF. Free, no signup, 100% local processing.',
      h1: 'Convert a video to animated GIF online',
      intro: 'Transform a video clip into an animated GIF. Set the start and end time, adjust the frame rate and size, then generate your GIF — all in your browser.',
      faq: [
        { q: 'How long can the GIF be?', a: 'Shorter clips (under 30 seconds) work best for GIFs. Longer clips create very large files.' },
      ],
      howTo: ['Upload your video', 'Set start and end time', 'Click Generate and download the GIF'],
    },
    'supprimer-audio-video': {
      title: 'Remove Audio from Video Online Free — Mute Video',
      desc: 'Remove the audio track from any video to create a silent video. Free, no signup, local processing.',
      h1: 'Remove audio from a video online',
      intro: 'Mute your video by removing its audio track. The video quality stays the same — only the sound is removed. Everything runs locally in your browser.',
      faq: [
        { q: 'Will the video quality change?', a: 'No, the video stream is preserved exactly as-is. Only the audio track is removed.' },
      ],
      howTo: ['Upload your video', 'Click Remove Audio', 'Download the silent video'],
    },
    'json-csv': {
      title: 'JSON to CSV Converter Online Free & Vice Versa',
      desc: 'Convert JSON to CSV and CSV to JSON easily. Free, no signup, 100% local processing.',
      h1: 'Convert JSON to CSV and vice versa',
      intro: 'Switch between JSON and CSV formats instantly. Paste your data, choose the conversion direction, and get the result. Perfect for data analysis, spreadsheet imports, and API debugging.',
      faq: [
        { q: 'Can I convert nested JSON?', a: 'Yes, the tool flattens nested objects into CSV columns automatically.' },
        { q: 'Is my data secure?', a: '100%. All data is processed in your browser. Nothing is sent to any server.' },
      ],
      howTo: ['Paste your JSON or CSV data', 'Choose the conversion direction', 'Copy or download the result'],
    },
    'testeur-regex': {
      title: 'Regex Tester Online Free — Regular Expression Tester',
      desc: 'Test your regular expressions with real-time matching and group highlighting. Free, no signup.',
      h1: 'Test regular expressions online',
      intro: 'Write and test your regex patterns with instant feedback. See matches, groups, and highlights in real time. Perfect for developers and data extraction tasks.',
      faq: [
        { q: 'What regex flavors are supported?', a: 'JavaScript regex syntax is used, which is compatible with most modern regex engines.' },
      ],
      howTo: ['Enter your regex pattern', 'Type or paste the test string', 'See matches and groups highlighted in real time'],
    },
    'meta-tags': {
      title: 'Meta Tags Generator & Previewer Online Free',
      desc: 'Generate and preview meta tags for SEO and social media. See how your page looks on Google, Twitter, and Facebook.',
      h1: 'Generate and preview meta tags online',
      intro: 'Create SEO-optimized meta tags and preview how your page will appear on Google, Twitter/X, and Facebook. Get suggestions for title length, description, and Open Graph tags.',
      faq: [
        { q: 'What tags can I generate?', a: 'Title, description, Open Graph (og:title, og:description, og:image), Twitter Card, canonical URL, and robots directives.' },
        { q: 'Can I preview social media appearance?', a: 'Yes, the tool shows previews for Google search results, Twitter/X cards, and Facebook link previews.' },
      ],
      howTo: ['Fill in your page details', 'Preview on Google, Twitter, and Facebook', 'Copy the generated HTML meta tags'],
    },
    'sitemap-robots': {
      title: 'Sitemap & Robots.txt Generator Online Free',
      desc: 'Generate XML sitemaps and robots.txt files for your website. Free, no signup, local processing.',
      h1: 'Generate sitemap.xml and robots.txt online',
      intro: 'Create a valid XML sitemap and robots.txt for your website. Enter your URLs, set priorities and frequencies, then download the files. All processed locally.',
      faq: [
        { q: 'What is a sitemap?', a: 'An XML file listing all pages on your site to help search engines discover and index them.' },
        { q: 'What goes in robots.txt?', a: 'Directives telling search engine crawlers which pages to crawl and which to skip.' },
      ],
      howTo: ['Add your website URLs', 'Configure priorities and change frequencies', 'Download sitemap.xml and robots.txt'],
    },
    'formateur-json': {
      title: 'JSON Formatter Online Free — Beautify & Validate JSON',
      desc: 'Format, validate, and minify JSON data instantly. Free, no signup, 100% local processing.',
      h1: 'Format and validate JSON online',
      intro: 'Paste your JSON to format it with proper indentation, validate syntax, or minify it. Essential for developers working with APIs, configs, and data processing.',
      faq: [
        { q: 'Can I validate JSON?', a: 'Yes, the tool highlights syntax errors and shows the exact location of any issues.' },
      ],
      howTo: ['Paste your JSON data', 'Click Format to beautify or Minify to compress', 'Copy the result or download it'],
    },
    'url-encode-decode': {
      title: 'URL Encode Decode Online Free',
      desc: 'Encode and decode URLs and query strings instantly. Free, no signup, local processing.',
      h1: 'Encode and decode URLs online',
      intro: 'Quickly encode special characters in URLs or decode percent-encoded strings. Essential for web developers, API testing, and debugging query parameters.',
      faq: [
        { q: 'What is URL encoding?', a: 'URL encoding converts special characters (spaces, accents, symbols) into percent-encoded format (e.g., %20 for space) so they are safe in URLs.' },
      ],
      howTo: ['Paste your URL or string', 'Click Encode or Decode', 'Copy the result'],
    },
    'css-gradient': {
      title: 'CSS Gradient Generator Online Free',
      desc: 'Create beautiful CSS gradients visually. Linear, radial, and conic gradients. Free, no signup.',
      h1: 'Create CSS gradients online',
      intro: 'Design beautiful CSS gradients with a visual editor. Choose between linear, radial, and conic gradients, adjust colors and angles, then copy the CSS code.',
      faq: [
        { q: 'What types of gradients are supported?', a: 'Linear, radial, and conic gradients. Each with customizable colors, angles, and positions.' },
        { q: 'Can I copy the CSS?', a: 'Yes, copy the generated CSS code with one click, ready to paste into your stylesheet.' },
      ],
      howTo: ['Choose gradient type (linear, radial, conic)', 'Adjust colors and angles', 'Copy the CSS code'],
    },
    'markdown-preview': {
      title: 'Markdown Preview Online Free — Live Editor',
      desc: 'Write Markdown with live preview. Free, no signup, 100% local processing.',
      h1: 'Markdown editor with live preview',
      intro: 'Write Markdown on the left and see the rendered preview on the right in real time. Supports GitHub-Flavored Markdown, tables, code blocks, and more.',
      faq: [
        { q: 'What Markdown features are supported?', a: 'Headings, bold, italic, links, images, code blocks, tables, task lists, and GitHub-Flavored Markdown extensions.' },
      ],
      howTo: ['Write Markdown in the editor', 'See the live preview', 'Copy the HTML output or download it'],
    },
    'nettoyeur-url-tracking': {
      title: 'URL Tracking Cleaner Online Free — Remove UTM Parameters',
      desc: 'Remove UTM and tracking parameters from URLs instantly. Free, no signup, local processing.',
      h1: 'Clean tracking parameters from URLs online',
      intro: 'Strip UTM parameters, click IDs, and other tracking tokens from URLs. Get a clean, shareable link without analytics noise. All processed in your browser.',
      faq: [
        { q: 'What parameters are removed?', a: 'UTM parameters (utm_source, utm_medium, etc.), click IDs (fbclid, gclid, msclkid), and other common tracking tokens.' },
        { q: 'Can I choose which parameters to keep?', a: 'Yes, you can customize which parameters to remove or keep.' },
      ],
      howTo: ['Paste your URL', 'Review detected tracking parameters', 'Copy the clean URL'],
    },
    'compteur-mots': {
      title: 'Word Counter Online Free — Character & Sentence Counter',
      desc: 'Count words, characters, sentences, and paragraphs instantly. Free, no signup, local processing.',
      h1: 'Count words and characters online',
      intro: 'Get instant word, character, sentence, and paragraph counts for any text. Includes reading time estimates and keyword density analysis.',
      faq: [
        { q: 'What does the word counter measure?', a: 'Words, characters (with and without spaces), sentences, paragraphs, and estimated reading time.' },
        { q: 'Is my text stored?', a: 'No. All processing happens in your browser. Your text is never sent to any server.' },
      ],
      howTo: ['Paste or type your text', 'See counts update in real time', 'Review the detailed statistics'],
    },
    'convertisseur-casse': {
      title: 'Case Converter Online Free — UPPER, lower, camelCase',
      desc: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more. Free, no signup.',
      h1: 'Convert text case online',
      intro: 'Transform your text between different case formats: UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and more.',
      faq: [
        { q: 'What case formats are supported?', a: 'UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more.' },
      ],
      howTo: ['Paste your text', 'Choose the target case format', 'Copy the converted text'],
    },
    'lorem-ipsum': {
      title: 'Lorem Ipsum Generator Online Free',
      desc: 'Generate placeholder text in paragraphs, sentences, or words. Free, no signup, local processing.',
      h1: 'Generate Lorem Ipsum placeholder text',
      intro: 'Generate Lorem Ipsum placeholder text for your designs and mockups. Choose the amount by paragraphs, sentences, or words.',
      faq: [
        { q: 'Can I customize the output?', a: 'Yes, choose between paragraphs, sentences, or words and set the exact quantity.' },
      ],
      howTo: ['Choose unit type (paragraphs, sentences, words)', 'Set the quantity', 'Copy the generated text'],
    },
    'base64': {
      title: 'Base64 Encode Decode Online Free',
      desc: 'Encode text to Base64 or decode Base64 to text instantly. Free, no signup, local processing.',
      h1: 'Encode and decode Base64 online',
      intro: 'Quickly encode text to Base64 format or decode Base64 strings back to readable text. Essential for developers working with data URIs, APIs, and binary data.',
      faq: [
        { q: 'What is Base64 used for?', a: 'Base64 encodes binary data as text. Used in data URIs, email attachments, API payloads, and JWT tokens.' },
      ],
      howTo: ['Paste your text or Base64 string', 'Click Encode or Decode', 'Copy the result'],
    },
    'comparateur-texte': {
      title: 'Text Diff Checker Online Free — Compare Two Texts',
      desc: 'Compare two texts side by side and see differences highlighted. Free, no signup, local processing.',
      h1: 'Compare two texts and find differences',
      intro: 'Paste two versions of a text and instantly see what was added, removed, or changed. Line-by-line diff with color-coded highlights.',
      faq: [
        { q: 'How does the diff work?', a: 'The tool compares texts line by line and highlights additions (green), deletions (red), and modifications.' },
      ],
      howTo: ['Paste the original text on the left', 'Paste the modified text on the right', 'Review the highlighted differences'],
    },
    'separateur-nom-prenom': {
      title: 'Name Splitter Online Free — Split First & Last Name',
      desc: 'Separate full names into first name and last name columns. Free, no signup, local processing.',
      h1: 'Split full names into first and last name online',
      intro: 'Paste a list of full names and automatically split them into first name and last name columns. Export as CSV or TSV. Perfect for cleaning up spreadsheets and contact lists.',
      faq: [
        { q: 'Does it handle compound names?', a: 'Yes, the tool recognizes common patterns for compound first names and multi-part last names.' },
      ],
      howTo: ['Paste your list of full names', 'Click Split', 'Export first and last name columns as CSV'],
    },
    'generateur-qr-code': {
      title: 'QR Code Generator Online Free — Create QR Codes',
      desc: 'Generate QR codes for URLs, text, WiFi, and more. Free, no signup, 100% local processing.',
      h1: 'Generate QR codes online for free',
      intro: 'Create QR codes for URLs, plain text, WiFi credentials, email addresses, and phone numbers. Customize colors and size, then download as PNG or SVG.',
      faq: [
        { q: 'What can I encode in a QR code?', a: 'URLs, plain text, WiFi credentials (SSID/password), email addresses, phone numbers, and vCards.' },
        { q: 'Can I customize the QR code?', a: 'Yes, change the foreground color, background color, and size. Download as PNG or SVG.' },
      ],
      howTo: ['Choose the content type', 'Enter your data', 'Customize and download the QR code'],
    },
    'generateur-mot-de-passe': {
      title: 'Password Generator Online Free — Secure Random Passwords',
      desc: 'Generate strong, random passwords with customizable rules. Free, no signup, local processing.',
      h1: 'Generate secure passwords online',
      intro: 'Create strong, random passwords with customizable length, character types, and rules. All generation happens locally — your passwords are never sent anywhere.',
      faq: [
        { q: 'How strong are the passwords?', a: 'Use 16+ characters with uppercase, lowercase, numbers, and symbols for maximum security.' },
        { q: 'Are generated passwords stored?', a: 'No. Passwords are generated in your browser and never sent to any server.' },
      ],
      howTo: ['Set password length and character types', 'Click Generate', 'Copy the password'],
    },
    'generateur-hash': {
      title: 'Hash Generator Online Free — MD5, SHA-1, SHA-256',
      desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly. Free, no signup, local processing.',
      h1: 'Generate MD5, SHA-1, SHA-256 hashes online',
      intro: 'Generate cryptographic hashes from any text or file. Supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, and more. All hashing is done locally in your browser.',
      faq: [
        { q: 'What is a hash?', a: 'A hash is a fixed-length string generated from input data using a one-way mathematical function. Used for data integrity verification and password storage.' },
      ],
      howTo: ['Enter text or upload a file', 'Select the hash algorithm', 'Copy the generated hash'],
    },
    'color-picker': {
      title: 'Color Picker Online Free — HEX, RGB, HSL Color Tool',
      desc: 'Pick colors and convert between HEX, RGB, HSL formats. Free, no signup, local processing.',
      h1: 'Pick colors and get HEX, RGB, HSL values online',
      intro: 'Choose colors with a visual picker and get the values in HEX, RGB, HSL, and CMYK formats. Copy any format with one click. Perfect for web designers and developers.',
      faq: [
        { q: 'Can I convert between color formats?', a: 'Yes, enter a HEX, RGB, or HSL value and get instant conversions to all other formats.' },
        { q: 'Can I copy the values?', a: 'Yes, each format has a copy button for quick use in your CSS or design tool.' },
      ],
      howTo: ['Use the visual color picker or enter a value', 'See HEX, RGB, HSL, CMYK conversions', 'Copy the format you need'],
    },
    'generateur-lien-whatsapp': {
      title: 'WhatsApp Direct Link Generator Online Free',
      desc: 'Create click-to-chat WhatsApp links with pre-filled messages. Free, no signup, local processing.',
      h1: 'Generate a WhatsApp direct link online',
      intro: 'Create a direct WhatsApp chat link with a pre-filled message. Share it on your website, social media, or email signature so anyone can message you without saving your number.',
      faq: [
        { q: 'Do I need a WhatsApp Business account?', a: 'No, the link works with any WhatsApp number — personal or business.' },
        { q: 'Can I customize the message?', a: 'Yes, add a default message that users will see when they open the link.' },
      ],
      howTo: ['Enter your phone number with country code', 'Write a default message', 'Copy the generated WhatsApp link'],
    },
    'generateur-uuid-guid': {
      title: 'UUID GUID Generator Online Free',
      desc: 'Generate UUID v4 and GUID identifiers instantly. Free, no signup, 100% local processing.',
      h1: 'Generate UUID and GUID identifiers online',
      intro: 'Generate random UUID v4 identifiers instantly. Create single or batch UUIDs for databases, APIs, and distributed systems. All generation is done locally.',
      faq: [
        { q: 'What is a UUID?', a: 'UUID (Universally Unique Identifier) is a 128-bit identifier standard. v4 uses random generation with virtually zero collision risk.' },
      ],
      howTo: ['Choose the quantity of UUIDs', 'Click Generate', 'Copy the UUIDs'],
    },
    'calculateur-imc': {
      title: 'BMI Calculator Online Free — Body Mass Index',
      desc: 'Calculate your Body Mass Index (BMI) instantly with health category classification. Free, no signup.',
      h1: 'Calculate your Body Mass Index (BMI) online',
      intro: 'Enter your weight and height to calculate your BMI and see which health category you fall into. Supports both metric (kg/cm) and imperial (lbs/ft) units.',
      faq: [
        { q: 'What is a healthy BMI?', a: 'A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.' },
        { q: 'Is BMI accurate for everyone?', a: 'BMI is a general indicator. It does not account for muscle mass, bone density, or body composition. Consult a healthcare professional for personalized advice.' },
      ],
      howTo: ['Enter your weight and height', 'Choose metric or imperial units', 'See your BMI and health category'],
    },
    'calculateur-age': {
      title: 'Age Calculator Online Free — Calculate Exact Age',
      desc: 'Calculate your exact age in years, months, days, hours, and minutes. Free, no signup.',
      h1: 'Calculate your exact age online',
      intro: 'Enter your date of birth and instantly see your age in years, months, days, hours, and minutes. Also shows your next birthday countdown.',
      faq: [
        { q: 'How precise is the calculation?', a: 'Calculates your age down to the exact day, including leap years.' },
      ],
      howTo: ['Enter your date of birth', 'See your exact age in multiple units', 'Check your next birthday countdown'],
    },
    'calculateur-pourcentage': {
      title: 'Percentage Calculator Online Free',
      desc: 'Calculate percentages, increases, decreases, and ratios instantly. Free, no signup, local processing.',
      h1: 'Calculate percentages online',
      intro: 'Quickly calculate percentages, percentage increases/decreases, and what percent one number is of another. Essential for finance, grades, and everyday math.',
      faq: [
        { q: 'What calculations can I do?', a: 'Percentage of a number, what percent X is of Y, percentage increase/decrease, and more.' },
      ],
      howTo: ['Choose the calculation type', 'Enter your numbers', 'Get instant results'],
    },
    'convertisseur-unites': {
      title: 'Unit Converter Online Free — Length, Weight, Temperature',
      desc: 'Convert between units of length, weight, temperature, area, volume, and more. Free, no signup.',
      h1: 'Convert units online for free',
      intro: 'Convert between units of length, weight, temperature, area, volume, speed, and time. Supports metric, imperial, and other common unit systems.',
      faq: [
        { q: 'What unit types are supported?', a: 'Length, weight/mass, temperature, area, volume, speed, time, data storage, and more.' },
      ],
      howTo: ['Select the unit category', 'Enter the value and source unit', 'See the converted result'],
    },
    'calculateur-dosage-beton': {
      title: 'Concrete Calculator Online Free — Cement Dosage Bags',
      desc: 'Calculate the amount of cement, sand, and gravel for your concrete project. Free, no signup.',
      h1: 'Calculate concrete dosage online',
      intro: 'Determine how many bags of cement, volumes of sand, and gravel you need for your project. Enter the dimensions and get an instant material estimate.',
      faq: [
        { q: 'What bag size is used?', a: 'The default is 35kg bags. You can adjust the bag size in the settings.' },
        { q: 'Which concrete mix ratios are supported?', a: 'Standard ratios like 1:2:3, 1:1.5:2.5, and custom ratios.' },
      ],
      howTo: ['Enter your project dimensions', 'Choose the concrete mix ratio', 'Get the material quantities needed'],
    },
    'calculateur-frais-kilometriques': {
      title: 'Mileage Reimbursement Calculator Online Free',
      desc: 'Calculate mileage reimbursement based on distance and applicable rates. Free, no signup, local processing.',
      h1: 'Calculate mileage reimbursement online',
      intro: 'Calculate your mileage reimbursement based on distance traveled and applicable per-kilometer rates. Supports French tax rates and custom rates.',
      faq: [
        { q: 'Which rates are used?', a: 'Default rates follow the French tax scale. You can also enter a custom per-km rate.' },
      ],
      howTo: ['Enter the distance traveled', 'Select or enter the per-km rate', 'Get the reimbursement amount'],
    },
    'convertisseur-couleurs': {
      title: 'Color Converter Online Free — HEX, RGB, HSL, CMYK',
      desc: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Free, no signup, local processing.',
      h1: 'Convert colors between HEX, RGB, HSL, CMYK',
      intro: 'Enter a color in any format (HEX, RGB, HSL) and get instant conversions to all other formats. Use the visual picker, numeric fields, or presets to find the perfect color for your web and design projects.',
      faq: [
        { q: 'How to convert HEX to RGB?', a: 'Enter your HEX code (e.g., #3b82f6) — the RGB value appears instantly.' },
        { q: 'What is CMYK format?', a: 'CMYK (Cyan, Magenta, Yellow, Key/Black) is used in print. Our tool converts your color to CMYK automatically.' },
        { q: 'Can I copy the values?', a: 'Yes, each format has a Copy button to grab the value.' },
      ],
      howTo: ['Pick a color or enter a HEX code', 'See RGB, HSL, and CMYK conversions', 'Copy the format you need'],
    },
    'chronometre': {
      title: 'Online Stopwatch Free — Precision Timer with Laps',
      desc: 'Free online stopwatch with lap functionality. Precise to the hundredth of a second.',
      h1: 'Online stopwatch with lap times',
      intro: 'A precision stopwatch right in your browser. Record lap times, measure to the hundredth of a second, and track your performance.',
      faq: [
        { q: 'What is the precision?', a: 'The stopwatch is precise to the hundredth of a second (10 ms).' },
        { q: 'Can I record laps?', a: 'Yes, the Lap button records the time elapsed since the last lap.' },
      ],
      howTo: ['Click Start to begin', 'Click Lap to record a split time', 'Click Pause or Reset'],
    },
    'timer-pomodoro': {
      title: 'Pomodoro Timer Online Free — Pomodoro Technique',
      desc: 'Free Pomodoro timer with customizable work sessions, short and long breaks. Boost your productivity.',
      h1: 'Pomodoro Timer — Productivity technique',
      intro: 'The Pomodoro technique alternates focused work periods with breaks. Our timer guides you with a visual interface and customizable settings.',
      faq: [
        { q: 'What is the Pomodoro technique?', a: 'Work 25 minutes, take a 5-minute break. After 4 sessions, take a longer 15-30 minute break.' },
        { q: 'Can I customize the durations?', a: 'Yes, you can adjust work time, break time, and the number of Pomodoros.' },
      ],
      howTo: ['Set work and break durations', 'Click Start', 'The timer automatically switches between work and breaks'],
    },
    'calculateur-tva': {
      title: 'VAT Calculator Online Free — Net, Gross, VAT Rates',
      desc: 'Calculate net, gross, and VAT amounts instantly from any rate. Free, no signup, 100% local.',
      h1: 'VAT Calculator: net, gross, and tax rate',
      intro: 'Easily calculate the net amount (HT), gross amount (TTC), and VAT. Select a preset VAT rate (France 20%, 10%, 5.5%, 2.1%, Belgium, Switzerland, Germany, Spain, UK) or enter a custom rate. Enter a gross amount to find the net, or vice versa.',
      faq: [
        { q: 'How to calculate VAT from gross (TTC)?', a: 'To find net from gross: Net = Gross / (1 + rate/100). For example, €120 gross with 20% VAT: Net = 120 / 1.20 = €100, VAT = €20.' },
        { q: 'How to calculate VAT from net (HT)?', a: 'VAT = Net × (rate/100) and Gross = Net + VAT. For example, €100 net with 20% VAT: VAT = €20, Gross = €120.' },
        { q: 'What are the French VAT rates?', a: 'France: 20% (standard), 10% (intermediate), 5.5% (reduced), 2.1% (super-reduced).' },
        { q: 'Does it work for other countries?', a: 'Yes, preset rates are available for Belgium, Switzerland, Germany, Spain, and the UK. You can also enter any custom rate.' },
      ],
      howTo: ['Choose calculation direction (Gross → Net or Net → Gross)', 'Enter the amount and select the VAT rate', 'See net, VAT, and gross amounts instantly'],
    },
    'generateur-nombres-aleatoires': {
      title: 'Random Number Generator Online Free',
      desc: 'Generate random numbers within any range. Free, no signup, 100% local processing.',
      h1: 'Generate random numbers online',
      intro: 'Generate one or more random numbers within a specified range. Choose minimum, maximum, and quantity. Perfect for draws, games, and statistical sampling.',
      faq: [
        { q: 'Can I generate multiple numbers?', a: 'Yes, set the quantity and whether duplicates are allowed.' },
      ],
      howTo: ['Set the minimum and maximum values', 'Choose the quantity', 'Click Generate'],
    },
    'calculateur-pourboire': {
      title: 'Tip Calculator Online Free — Calculate Tips & Split Bill',
      desc: 'Calculate tips and split bills easily. Free, no signup, 100% local processing.',
      h1: 'Calculate tips and split bills online',
      intro: 'Enter the bill amount, choose a tip percentage, and optionally split the total among multiple people. Quick and easy for restaurants and group outings.',
      faq: [
        { q: 'Can I split the bill?', a: 'Yes, enter the number of people to split the total including tip.' },
      ],
      howTo: ['Enter the bill amount', 'Choose the tip percentage', 'Split among people if needed'],
    },
  },

  es: {
    'compresser-pdf': {
      title: 'Comprimir PDF Online Gratis — Reducir Tamaño PDF',
      desc: 'Reduce el tamaño de tus archivos PDF hasta un 80% gratis. Sin registro, procesamiento 100% local en tu navegador.',
      h1: 'Comprimir un archivo PDF online gratis',
      intro: 'Nuestra herramienta de compresión PDF reduce instantáneamente el tamaño de tus documentos sin pérdida de calidad visible. Ideal para enviar archivos por email, subirlos a sitios web o ahorrar espacio. Ningún archivo se envía a un servidor: todo se procesa en tu navegador.',
      faq: [
        { q: '¿Cómo comprimir un PDF gratis?', a: 'Arrastra tu archivo PDF a la zona, elige el nivel de compresión y descarga el resultado. Totalmente gratis y sin registro.' },
        { q: '¿Son seguros mis archivos?', a: 'Sí, 100%. Todo el procesamiento se realiza en tu navegador. Ningún archivo se sube a servidores.' },
      ],
      howTo: ['Arrastra tu archivo PDF', 'Elige el nivel de compresión', 'Haz clic en Comprimir y descarga'],
    },
    'fusionner-pdf': {
      title: 'Fusionar PDF Online Gratis — Combinar Varios PDF',
      desc: 'Fusiona varios archivos PDF en un solo documento en segundos. Gratis, sin registro, procesamiento local.',
      h1: 'Fusionar varios PDF en un solo archivo',
      intro: 'Combina fácilmente 2 o más documentos PDF en un solo archivo. Reordena las páginas arrastrando antes de fusionar. Perfecto para ensamblar facturas, informes o documentos administrativos.',
      faq: [
        { q: '¿Cómo fusionar PDFs online?', a: 'Añade tus archivos PDF, reordénalos y haz clic en Fusionar. Obtendrás un PDF combinado.' },
      ],
      howTo: ['Añade tus archivos PDF', 'Reordena arrastrando', 'Haz clic en Fusionar y descarga'],
    },
    'convertir-image': {
      title: 'Convertidor de Imágenes Online Gratis — WebP, AVIF, JPG, PNG',
      desc: 'Convierte imágenes entre formatos: WebP, AVIF, JPG, PNG y más. Gratis, sin registro.',
      h1: 'Convertir imágenes a WebP, AVIF, JPG, PNG',
      intro: 'Convierte tus imágenes a formatos modernos como WebP y AVIF para mejor rendimiento web, o cambia entre JPG, PNG y otros formatos.',
      faq: [
        { q: '¿Qué formatos son compatibles?', a: 'JPG, PNG, WebP, AVIF, BMP, GIF y más.' },
      ],
      howTo: ['Sube tu imagen', 'Elige el formato de salida', 'Descarga el archivo convertido'],
    },
    'compresser-image': {
      title: 'Comprimir Imagen Online Gratis — Reducir Tamaño',
      desc: 'Optimiza y reduce el tamaño de tus imágenes sin pérdida visible de calidad. Gratis, sin registro.',
      h1: 'Comprimir una imagen online gratis',
      intro: 'Reduce el tamaño de tus imágenes manteniendo la calidad visual. Perfecto para optimizar el rendimiento web y ahorrar espacio.',
      faq: [
        { q: '¿Perderé calidad?', a: 'Nuestra herramienta usa compresión inteligente para minimizar el tamaño manteniendo la calidad visual.' },
      ],
      howTo: ['Sube tu imagen', 'Ajusta el nivel de compresión', 'Descarga la imagen optimizada'],
    },
    'generateur-qr-code': {
      title: 'Generador de QR Code Online Gratis',
      desc: 'Genera códigos QR para URLs, texto, WiFi y más. Gratis, sin registro.',
      h1: 'Generar códigos QR online gratis',
      intro: 'Crea códigos QR para URLs, texto, credenciales WiFi y más. Personaliza colores y descarga como PNG o SVG.',
      faq: [
        { q: '¿Qué puedo codificar?', a: 'URLs, texto, WiFi (SSID/contraseña), emails, teléfonos y vCards.' },
      ],
      howTo: ['Elige el tipo de contenido', 'Introduce tus datos', 'Personaliza y descarga el QR'],
    },
    'generateur-mot-de-passe': {
      title: 'Generador de Contraseñas Online Gratis',
      desc: 'Genera contraseñas fuertes y aleatorias. Gratis, sin registro, procesamiento local.',
      h1: 'Generar contraseñas seguras online',
      intro: 'Crea contraseñas fuertes y aleatorias con longitud y tipos de caracteres personalizables. Todo se genera localmente.',
      faq: [
        { q: '¿Son seguras las contraseñas?', a: 'Usa 16+ caracteres con mayúsculas, minúsculas, números y símbolos para máxima seguridad.' },
      ],
      howTo: ['Configura longitud y tipos de caracteres', 'Haz clic en Generar', 'Copia la contraseña'],
    },
    'compteur-mots': {
      title: 'Contador de Palabras Online Gratis',
      desc: 'Cuenta palabras, caracteres, frases y párrafos al instante. Gratis, sin registro.',
      h1: 'Contar palabras y caracteres online',
      intro: 'Obtén recuentos instantáneos de palabras, caracteres, frases y párrafos. Incluye estimación de tiempo de lectura.',
      faq: [
        { q: '¿Qué mide el contador?', a: 'Palabras, caracteres, frases, párrafos y tiempo estimado de lectura.' },
      ],
      howTo: ['Pega o escribe tu texto', 'Ve los recuentos actualizados', 'Revisa las estadísticas detalladas'],
    },
    'calculateur-imc': {
      title: 'Calculadora de IMC Online Gratis — Índice de Masa Corporal',
      desc: 'Calcula tu Índice de Masa Corporal con clasificación de salud. Gratis, sin registro.',
      h1: 'Calcular tu Índice de Masa Corporal online',
      intro: 'Ingresa tu peso y altura para calcular tu IMC y ver tu categoría de salud. Soporta unidades métricas e imperiales.',
      faq: [
        { q: '¿Cuál es un IMC saludable?', a: 'Un IMC entre 18.5 y 24.9 se considera peso normal.' },
      ],
      howTo: ['Ingresa peso y altura', 'Elige unidades métricas o imperiales', 'Ve tu IMC y categoría'],
    },
    'calculateur-age': {
      title: 'Calculadora de Edad Online Gratis',
      desc: 'Calcula tu edad exacta en años, meses, días, horas y minutos. Gratis, sin registro.',
      h1: 'Calcular tu edad exacta online',
      intro: 'Ingresa tu fecha de nacimiento y ve tu edad exacta en años, meses, días, horas y minutos.',
      faq: [
        { q: '¿Es precisa la calculadora?', a: 'Sí, calcula hasta el día exacto, incluyendo años bisiestos.' },
      ],
      howTo: ['Ingresa tu fecha de nacimiento', 'Ve tu edad exacta', 'Consulta la cuenta regresiva a tu cumpleaños'],
    },
    'convertisseur-unites': {
      title: 'Convertidor de Unidades Online Gratis',
      desc: 'Convierte entre unidades de longitud, peso, temperatura, área y más. Gratis, sin registro.',
      h1: 'Convertir unidades online gratis',
      intro: 'Convierte entre unidades de longitud, peso, temperatura, área, volumen, velocidad y tiempo.',
      faq: [
        { q: '¿Qué tipos de unidades?', a: 'Longitud, peso, temperatura, área, volumen, velocidad, tiempo y más.' },
      ],
      howTo: ['Selecciona la categoría', 'Ingresa el valor', 'Ve el resultado convertido'],
    },
    'calculateur-tva': {
      title: 'Calculadora de IVA Online Gratis',
      desc: 'Calcula importes netos, brutos e IVA al instante. Gratis, sin registro, 100% local.',
      h1: 'Calculadora de IVA: neto, bruto y tasa',
      intro: 'Calcula fácilmente el importe neto, bruto y el IVA. Selecciona una tasa predefinida o introduce una personalizada.',
      faq: [
        { q: '¿Cómo calcular IVA desde el bruto?', a: 'Neto = Bruto / (1 + tasa/100). Ejemplo: 120€ bruto con 21% IVA → Neto = 120/1.21 = 99.17€, IVA = 20.83€.' },
        { q: '¿Qué tasas están disponibles?', a: 'España: 21%, 10%, 4%. Francia, Bélgica, Alemania, Suiza y Reino Unido también disponibles. Tasa personalizada posible.' },
      ],
      howTo: ['Elige dirección de cálculo', 'Introduce importe y tasa', 'Ve resultados al instante'],
    },
    'decouper-video': {
      title: 'Recortar Video Online Gratis — Cortar Clips de Video',
      desc: 'Corta y recorta clips de video directamente en tu navegador. Gratis, sin registro.',
      h1: 'Recortar un video online gratis',
      intro: 'Corta tus videos para conservar solo las partes que necesitas. Establece puntos de inicio y fin con precisión.',
      faq: [
        { q: '¿Qué formatos son compatibles?', a: 'MP4, WebM, MOV, AVI y la mayoría de formatos comunes.' },
      ],
      howTo: ['Sube tu video', 'Establece puntos de inicio y fin', 'Descarga el clip recortado'],
    },
    'telecharger-miniature-youtube': {
      title: 'Descargar Miniatura YouTube Online Gratis — HD',
      desc: 'Descarga miniaturas de videos de YouTube en HD. Gratis, sin registro.',
      h1: 'Descargar miniaturas de YouTube en HD',
      intro: 'Obtén miniaturas en alta resolución de cualquier video de YouTube. Solo pega la URL y descarga.',
      faq: [
        { q: '¿Qué resoluciones hay?', a: 'Por defecto, media, alta, HD y resolución máxima (1280x720 o superior).' },
      ],
      howTo: ['Pega la URL del video', 'Elige la resolución', 'Descarga la miniatura'],
'pdf-en-images': {
      title: 'Convertir PDF a Imágenes JPG PNG Gratis en Línea',
      desc: 'Convierte cada página de tu PDF en imágenes JPG o PNG de alta calidad. Gratis, sin registro, procesamiento 100% local.',
      h1: 'Convertir un PDF a imágenes JPG o PNG en línea',
      intro: 'Transforma cada página de tus documentos PDF en imágenes de alta resolución (JPG o PNG) en segundos. Esta herramienta es especialmente útil para integrar páginas PDF en presentaciones PowerPoint, compartirlas en redes sociales o editarlas en software de retoque fotográfico. Todo el procesamiento se realiza localmente en tu navegador, garantizando la privacidad total de tus documentos.',
      faq: [
        { q: '¿En qué formato serán mis imágenes?', a: 'Puedes elegir entre JPG (ligero) y PNG (calidad máxima, transparencia posible).' },
        { q: '¿La calidad es buena?', a: 'Sí, las imágenes se generan en alta resolución directamente en tu navegador.' },
        { q: '¿Puedo convertir un PDF protegido?', a: 'Necesitas conocer la contraseña para desbloquear el PDF antes de convertirlo.' },
      ],
      howTo: ['Sube tu archivo PDF', 'Elige el formato de salida (JPG o PNG)', 'Descarga las imágenes generadas'],
    },
    'signer-pdf': {
      title: 'Firmar PDF en Línea Gratis — Firma Electrónica',
      desc: 'Firma y anota tus documentos PDF directamente en el navegador. Dibuja o escribe tu firma. 100% gratuito.',
      h1: 'Firmar un documento PDF en línea',
      intro: 'Añade tu firma manuscrita o escrita a cualquier documento PDF sin imprimir ni escanear. Ideal para contratos, pedidos y formularios administrativos. Todo se procesa localmente en tu navegador.',
      faq: [
        { q: '¿Mi firma es legalmente válida?', a: 'Nuestra herramienta crea una firma simple. Para un valor jurídico reforzado, consulta un servicio de firma electrónica certificado eIDAS.' },
      ],
      howTo: ['Sube tu PDF', 'Dibuja o escribe tu firma', 'Posiciónala en el documento y descárgalo'],
    },
    'deverrouiller-pdf': {
      title: 'Desbloquear PDF en Línea Gratis — Quitar Contraseña',
      desc: 'Elimina la protección por contraseña de tus archivos PDF fácilmente. Gratis y 100% en tu navegador.',
      h1: 'Desbloquear un PDF protegido por contraseña',
      intro: '¿Tienes un PDF protegido cuya contraseña conoces? Elimina la protección en un clic para acceder libremente a él. No se sube ningún archivo a servidores, todo se procesa en tu navegador.',
      faq: [
        { q: '¿Puedo desbloquear un PDF sin la contraseña?', a: 'No, necesitas conocer la contraseña para desbloquearlo. Nuestra herramienta elimina la protección pero no descifra contraseñas.' },
      ],
      howTo: ['Sube tu PDF protegido', 'Introduce la contraseña', 'Descarga el PDF desbloqueado'],
    },
    'proteger-pdf': {
      title: 'Proteger PDF en Línea Gratis — Añadir Contraseña',
      desc: 'Añade protección por contraseña a tus archivos PDF gratis. Procesamiento 100% local, sin subir archivos.',
      h1: 'Proteger un PDF con contraseña',
      intro: 'Asegura tus documentos PDF añadiendo una contraseña. Solo las personas que conozcan la contraseña podrán abrir y leer tu archivo. No se sube ningún archivo a servidores, todo se procesa localmente.',
      faq: [
        { q: '¿Qué nivel de protección ofrece?', a: 'Tu PDF requerirá una contraseña para abrirse. Usa una contraseña fuerte para mayor seguridad.' },
      ],
      howTo: ['Sube tu PDF', 'Elige una contraseña', 'Descarga el PDF protegido'],
    },
    'redimensionner-image': {
      title: 'Redimensionar Imagen en Línea Gratis — Cambiar Tamaño',
      desc: 'Redimensiona imágenes online gratis. Cambia el tamaño de fotos manteniendo la calidad. Sin registro, procesamiento local.',
      h1: 'Redimensionar una imagen en línea',
      intro: 'Cambia el tamaño de tus imágenes fácilmente manteniendo la calidad. Especifica las dimensiones deseadas en píxeles o porcentaje y obtén la imagen redimensionada al instante. Perfecto para adaptar fotos a requisitos de redes sociales, correo electrónico o impresión.',
      faq: [
        { q: '¿Puedo redimensionar manteniendo la proporción?', a: 'Sí, por defecto se mantiene la relación de aspecto. Puedes desactivarla si necesitas dimensiones específicas.' },
        { q: '¿Qué formatos acepta?', a: 'JPG, PNG, WebP, GIF, BMP y más.' },
      ],
      howTo: ['Sube tu imagen', 'Introduce las dimensiones deseadas', 'Descarga la imagen redimensionada'],
    },
    'supprimer-arriere-plan': {
      title: 'Eliminar Fondo de Imagen en Línea Gratis',
      desc: 'Elimina el fondo de tus fotos automáticamente. Gratis, sin registro, procesamiento 100% local.',
      h1: 'Eliminar el fondo de una imagen en línea',
      intro: 'Retira el fondo de tus fotos automáticamente con inteligencia artificial. Obtén imágenes con fondo transparente en segundos, ideales para presentaciones, diseño gráfico o catálogos de productos. Todo se procesa localmente en tu navegador.',
      faq: [
        { q: '¿El resultado es preciso?', a: 'La IA detecta automáticamente el sujeto principal. Para resultados perfectos, usa imágenes con buen contraste entre sujeto y fondo.' },
        { q: '¿Puedo usar imágenes con fondo complejo?', a: 'Sí, la herramienta funciona con fondos complejos, aunque los resultados pueden variar.' },
      ],
      howTo: ['Sube tu imagen', 'La IA elimina el fondo automáticamente', 'Descarga la imagen sin fondo en PNG'],
    },
    'heic-vers-jpg': {
      title: 'Convertir HEIC a JPG en Línea Gratis — Fotos iPhone',
      desc: 'Convierte fotos HEIC de iPhone a JPG o PNG fácilmente. Gratis, sin registro, procesamiento local.',
      h1: 'Convertir fotos HEIC a JPG o PNG en línea',
      intro: 'Transforma tus fotos iPhone en formato HEIC a JPG o PNG universalmente compatibles. Perfecto para compartir fotos en redes sociales, enviarlas por email o editarlas en software que no soporta HEIC. Procesamiento 100% local.',
      faq: [
        { q: '¿Por qué mis fotos iPhone están en HEIC?', a: 'Apple usa HEIC por defecto desde iOS 11 para ahorrar espacio. Nuestra herramienta las convierte a JPG para máxima compatibilidad.' },
        { q: '¿Se pierde calidad al convertir?', a: 'La conversión a JPG puede tener una ligera pérdida de calidad, pero a alta calidad es imperceptible.' },
      ],
      howTo: ['Sube tus fotos HEIC', 'Elige el formato de salida (JPG o PNG)', 'Descarga las imágenes convertidas'],
    },
    'compresser-video': {
      title: 'Comprimir Vídeo en Línea Gratis — Reducir Tamaño',
      desc: 'Reduce el tamaño de tus vídeos hasta un 80% gratis. Sin registro, procesamiento 100% local en tu navegador.',
      h1: 'Comprimir un vídeo en línea gratis',
      intro: 'Nuestra herramienta de compresión de vídeo reduce instantáneamente el tamaño de tus vídeos sin pérdida visible de calidad. Ideal para enviar vídeos por email, subirlos a redes sociales o ahorrar espacio de almacenamiento. Todo se procesa en tu navegador, garantizando la privacidad.',
      faq: [
        { q: '¿Cómo comprimir un vídeo gratis?', a: 'Arrastra y suelta tu archivo de vídeo, elige el nivel de compresión y descarga el resultado. Completamente gratis y sin registro.' },
        { q: '¿Mis archivos están seguros?', a: 'Sí, 100%. Todo el procesamiento se realiza en tu navegador web. No se suben archivos a servidores.' },
      ],
      howTo: ['Arrastra tu archivo de vídeo', 'Elige el nivel de compresión', 'Descarga el vídeo comprimido'],
    },
    'convertir-video': {
      title: 'Convertir Vídeo en Línea Gratis — MP4, WebM, AVI',
      desc: 'Convierte vídeos entre formatos: MP4, WebM, AVI y más. Gratis, sin registro, procesamiento local.',
      h1: 'Convertir un vídeo en línea gratis',
      intro: 'Convierte tus vídeos a cualquier formato popular: MP4 para máxima compatibilidad, WebM para la web, o AVI para archivar. Todo el procesamiento se realiza localmente en tu navegador, sin subir archivos a servidores.',
      faq: [
        { q: '¿Qué formatos puedo convertir?', a: 'MP4, WebM, AVI, MOV, MKV y más. La conversión se hace directamente en tu navegador.' },
        { q: '¿La calidad se mantiene?', a: 'Sí, puedes elegir la calidad de salida. La conversión a MP4 con alta calidad conserva prácticamente la calidad original.' },
      ],
      howTo: ['Sube tu archivo de vídeo', 'Elige el formato de salida', 'Descarga el vídeo convertido'],
    },
    'ajouter-audio-video': {
      title: 'Añadir Audio a Vídeo en Línea Gratis',
      desc: 'Añade música o voz a tus vídeos fácilmente. Gratis, sin registro, procesamiento local.',
      h1: 'Añadir audio a un vídeo en línea',
      intro: 'Añade una pista de audio (música, voz en off, sonido) a tu vídeo en unos pocos clics. Ajusta el volumen y la sincronización. Ideal para vídeos de YouTube, TikTok, presentaciones o tutoriales. Procesamiento 100% local.',
      faq: [
        { q: '¿Puedo ajustar el volumen del audio?', a: 'Sí, puedes controlar el volumen del audio añadido y del vídeo original independientemente.' },
      ],
      howTo: ['Sube tu vídeo', 'Sube el archivo de audio', 'Ajusta el volumen y descarga el resultado'],
    },
    'extraire-audio-video': {
      title: 'Extraer Audio de Vídeo en Línea Gratis — MP3, WAV',
      desc: 'Extrae la pista de audio de cualquier vídeo en MP3 o WAV. Gratis, sin registro, procesamiento local.',
      h1: 'Extraer el audio de un vídeo en línea',
      intro: 'Extrae la pista de audio de cualquier vídeo para obtener archivos MP3 o WAV. Perfecto para crear podcasts a partir de vídeos, guardar música de clips o recuperar audio de conferencias. Todo se procesa en tu navegador.',
      faq: [
        { q: '¿En qué formato puedo extraer el audio?', a: 'MP3 (compatible universalmente) o WAV (sin compresión, máxima calidad).' },
      ],
      howTo: ['Sube tu vídeo', 'Elige el formato de audio (MP3 o WAV)', 'Descarga el archivo de audio'],
    },
    'video-en-gif': {
      title: 'Convertir Vídeo a GIF Animado en Línea Gratis',
      desc: 'Crea GIFs animados a partir de vídeos fácilmente. Gratis, sin registro, procesamiento local.',
      h1: 'Convertir un vídeo en GIF animado en línea',
      intro: 'Transforma cualquier fragmento de vídeo en un GIF animado para compartir en redes sociales, mensajes o emails. Selecciona el inicio y fin del fragmento y ajusta la calidad. Procesamiento 100% local en tu navegador.',
      faq: [
        { q: '¿Cuánto puede durar el GIF?', a: 'No hay límite estricto, pero los GIFs cortos (2-10 segundos) son más prácticos para compartir.' },
        { q: '¿La calidad es buena?', a: 'Puedes ajustar la calidad del GIF. Mayor calidad significa archivo más grande.' },
      ],
      howTo: ['Sube tu vídeo', 'Selecciona el fragmento (inicio y fin)', 'Descarga el GIF animado'],
    },
    'supprimer-audio-video': {
      title: 'Eliminar Audio de Vídeo en Línea Gratis — Silenciar Vídeo',
      desc: 'Retira la pista de audio de tus vídeos fácilmente. Gratis, sin registro, procesamiento local.',
      h1: 'Eliminar el audio de un vídeo en línea',
      intro: 'Silencia tus vídeos eliminando la pista de audio en un clic. Útil para crear vídeos de fondo, eliminar ruido no deseado o preparar vídeos para añadir otra pista de audio. Procesamiento 100% local en tu navegador.',
      faq: [
        { q: '¿El vídeo mantiene su calidad?', a: 'Sí, el vídeo se mantiene exactamente igual, solo se elimina el audio.' },
      ],
      howTo: ['Sube tu vídeo', 'La pista de audio se elimina automáticamente', 'Descarga el vídeo sin audio'],
    },
    'generateur-favicon': {
      title: 'Generador de Favicon Gratis en Línea — Iconos de Sitio Web',
      desc: 'Crea favicon e iconos para tu sitio web a partir de cualquier imagen. Gratis, sin registro.',
      h1: 'Generar un favicon para tu sitio web en línea',
      intro: 'Crea favicon e iconos en múltiples tamaños (16x16, 32x32, 192x192, 512x512) a partir de cualquier imagen o logo. Perfecto para mejorar la apariencia de tu sitio web en pestañas del navegador, marcadores y pantallas de inicio de móvil. Procesamiento 100% local.',
      faq: [
        { q: '¿Qué tamaños de favicon se generan?', a: 'Se generan automáticamente los tamaños estándar: 16x16, 32x32, 192x192 y 512x512 píxeles.' },
      ],
      howTo: ['Sube tu logo o imagen', 'Los favicons se generan automáticamente', 'Descarga el paquete completo'],
    },
    },
  },

  de: {
    'compresser-pdf': {
      title: 'PDF Komprimieren Online Kostenlos — PDF Größe Reduzieren',
      desc: 'Reduzieren Sie Ihre PDF-Dateigröße bis zu 80% kostenlos. Keine Anmeldung, 100% lokale Verarbeitung.',
      h1: 'PDF-Datei online kostenlos komprimieren',
      intro: 'Unser PDF-Komprimierungstool reduziert sofort die Größe Ihrer Dokumente ohne sichtbaren Qualitätsverlust. Ideal zum Versenden, Hochladen oder Speichern. Kein Datei-Upload — alles läuft im Browser.',
      faq: [
        { q: 'Wie kann ich ein PDF kostenlos komprimieren?', a: 'Ziehen Sie Ihre PDF-Datei in die Dropzone, wählen Sie die Komprimierungsstufe und laden Sie das Ergebnis herunter.' },
        { q: 'Sind meine Dateien sicher?', a: 'Ja, 100%. Die Verarbeitung erfolgt vollständig in Ihrem Browser. Keine Datei wird auf Server hochgeladen.' },
      ],
      howTo: ['PDF-Datei in die Dropzone ziehen', 'Komprimierungsstufe wählen', 'Auf "Komprimieren" klicken und herunterladen'],
    },
    'fusionner-pdf': {
      title: 'PDF Zusammenführen Online Kostenlos — PDFs Kombinieren',
      desc: 'Fügen Sie mehrere PDF-Dateien zu einem Dokument zusammen. Kostenlos, keine Anmeldung, lokale Verarbeitung.',
      h1: 'Mehrere PDFs zu einer Datei zusammenführen',
      intro: 'Kombinieren Sie einfach 2 oder mehr PDF-Dokumente zu einer einzigen Datei. Seiten per Drag-and-Drop neu anordnen.',
      faq: [
        { q: 'Wie kann ich PDFs online zusammenführen?', a: 'Fügen Sie Ihre PDFs hinzu, ordnen Sie sie und klicken Sie auf Zusammenführen.' },
      ],
      howTo: ['PDF-Dateien hinzufügen', 'Per Drag-and-Drop ordnen', 'Zusammenführen und herunterladen'],
    },
    'generateur-qr-code': {
      title: 'QR Code Generator Online Kostenlos',
      desc: 'Generieren Sie QR-Codes für URLs, Text, WLAN und mehr. Kostenlos, keine Anmeldung.',
      h1: 'QR-Codes online kostenlos generieren',
      intro: 'Erstellen Sie QR-Codes für URLs, Text, WLAN-Zugangsdaten und mehr. Farben und Größe anpassen.',
      faq: [
        { q: 'Was kann ich kodieren?', a: 'URLs, Text, WLAN (SSID/Passwort), E-Mails, Telefonnummern und vCards.' },
      ],
      howTo: ['Inhaltstyp wählen', 'Daten eingeben', 'QR-Code anpassen und herunterladen'],
    },
    'generateur-mot-de-passe': {
      title: 'Passwort Generator Online Kostenlos',
      desc: 'Generieren Sie starke, zufällige Passwörter. Kostenlos, keine Anmeldung, lokale Verarbeitung.',
      h1: 'Sichere Passwörter online generieren',
      intro: 'Erstellen Sie starke, zufällige Passwörter mit anpassbarer Länge und Zeichentypen. Alles lokal generiert.',
      faq: [
        { q: 'Wie stark sind die Passwörter?', a: 'Verwenden Sie 16+ Zeichen mit Groß-/Kleinschreibung, Zahlen und Symbolen für maximale Sicherheit.' },
      ],
      howTo: ['Länge und Zeichentypen einstellen', 'Generieren klicken', 'Passwort kopieren'],
    },
    'calculateur-imc': {
      title: 'BMI Rechner Online Kostenlos — Body-Mass-Index',
      desc: 'Berechnen Sie Ihren Body-Mass-Index mit Gesundheitsklassifikation. Kostenlos, keine Anmeldung.',
      h1: 'Body-Mass-Index (BMI) online berechnen',
      intro: 'Geben Sie Gewicht und Größe ein, um Ihren BMI zu berechnen und Ihre Gesundheitskategorie zu sehen.',
      faq: [
        { q: 'Was ist ein gesunder BMI?', a: 'Ein BMI zwischen 18,5 und 24,9 gilt als Normalgewicht.' },
      ],
      howTo: ['Gewicht und Größe eingeben', 'Metrische oder imperiale Einheiten wählen', 'BMI und Kategorie anzeigen'],
    },
    'convertisseur-unites': {
      title: 'Einheitenumrechner Online Kostenlos',
      desc: 'Umrechnen zwischen Länge, Gewicht, Temperatur, Fläche und mehr. Kostenlos, keine Anmeldung.',
      h1: 'Einheiten online umrechnen',
      intro: 'Rechnen Sie zwischen Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit und Zeit um.',
      faq: [
        { q: 'Welche Einheitentypen?', a: 'Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit, Zeit und mehr.' },
      ],
      howTo: ['Kategorie wählen', 'Wert eingeben', 'Ergebnis anzeigen'],
    },
  },

  ar: {
    'compresser-pdf': {
      title: 'ضغط PDF مجاني عبر الإنترنت — تقليل حجم PDF',
      desc: 'قم بتقليل حجم ملفات PDF بنسبة تصل إلى 80% مجانًا. بدون تسجيل، معالجة 100% محلية.',
      h1: 'ضغط ملف PDF مجانًا عبر الإنترنت',
      intro: 'تقوم أداة ضغط PDF بتقليل حجم مستنداتك فورًا دون فقدان مرئي للجودة. مثالية لإرسال الملفات أو تحميلها أو توفير مساحة التخزين. لا يتم إرسال أي ملف إلى خادم — كل شيء يعمل في متصفحك.',
      faq: [
        { q: 'كيف أضغط ملف PDF مجانًا؟', a: 'اسحب ملف PDF وأفلته، اختر مستوى الضغط، ثم حمّل النتيجة.' },
        { q: 'هل ملفاتي آمنة؟', a: 'نعم، 100%. تتم المعالجة بالكامل في متصفحك. لا يتم رفع أي ملف.' },
      ],
      howTo: ['اسحب ملف PDF', 'اختر مستوى الضغط', 'انقر "ضغط" وحمّل النتيجة'],
    },
    'generateur-qr-code': {
      title: 'مولد رمز QR مجاني عبر الإنترنت',
      desc: 'أنشئ رموز QR للروابط والنص وWiFi والمزيد. مجاني، بدون تسجيل.',
      h1: 'إنشاء رموز QR مجانًا عبر الإنترنت',
      intro: 'أنشئ رموز QR للروابط والنص وبيانات WiFi والمزيد. خصّص الألوان والحجم وحمّل كـ PNG أو SVG.',
      faq: [
        { q: 'ماذا يمكنني ترميزه؟', a: 'الروابط، النص، WiFi، البريد الإلكتروني، أرقام الهاتف وبطاقات vCard.' },
      ],
      howTo: ['اختر نوع المحتوى', 'أدخل بياناتك', 'خصّص وحمّل رمز QR'],
    },
    'generateur-mot-de-passe': {
      title: 'مولد كلمات مرور مجاني عبر الإنترنت',
      desc: 'أنشئ كلمات مرور قوية وعشوائية. مجاني، بدون تسجيل، معالجة محلية.',
      h1: 'إنشاء كلمات مرور آمنة عبر الإنترنت',
      intro: 'أنشئ كلمات مرور قوية وعشوائية بطول وأنواع أحرف قابلة للتخصيص. كل شيء يُنشأ محليًا.',
      faq: [
        { q: 'هل كلمات المرور قوية؟', a: 'استخدم 16+ حرفًا بأحرف كبيرة وصغيرة وأرقام ورموز لأقصى أمان.' },
      ],
      howTo: ['اضبط الطول وأنواع الأحرف', 'انقر إنشاء', 'انسخ كلمة المرور'],
    },
  },

  pt: {
    'compresser-pdf': {
      title: 'Comprimir PDF Online Grátis — Reduzir Tamanho PDF',
      desc: 'Reduza o tamanho dos seus ficheiros PDF até 80% gratuitamente. Sem registo, processamento 100% local.',
      h1: 'Comprimir ficheiro PDF online grátis',
      intro: 'A nossa ferramenta de compressão PDF reduz instantaneamente o tamanho dos seus documentos sem perda visível de qualidade. Ideal para enviar ficheiros, carregar em sites ou poupar espaço. Nenhum ficheiro é enviado a servidores — tudo corre no seu navegador.',
      faq: [
        { q: 'Como comprimir PDF grátis?', a: 'Arraste o ficheiro PDF, escolha o nível de compressão e transfira o resultado.' },
        { q: 'Os meus ficheiros estão seguros?', a: 'Sim, 100%. Tudo é processado no seu navegador. Nenhum ficheiro é carregado para servidores.' },
      ],
      howTo: ['Arraste o ficheiro PDF', 'Escolha o nível de compressão', 'Clique "Comprimir" e transfira'],
    },
    'fusionner-pdf': {
      title: 'Unir PDF Online Grátis — Combinar Vários PDFs',
      desc: 'Una vários ficheiros PDF num só documento em segundos. Grátis, sem registo.',
      h1: 'Unir vários PDFs num só ficheiro',
      intro: 'Combine facilmente 2 ou mais documentos PDF num só ficheiro. Reordene as páginas antes de unir.',
      faq: [
        { q: 'Como unir PDFs online?', a: 'Adicione os seus PDFs, reordene e clique em Unir. Obterá um PDF combinado.' },
      ],
      howTo: ['Adicione os seus PDFs', 'Reordene arrastando', 'Clique Unir e transfira'],
    },
    'generateur-qr-code': {
      title: 'Gerador de QR Code Online Grátis',
      desc: 'Gere códigos QR para URLs, texto, WiFi e mais. Grátis, sem registo.',
      h1: 'Gerar códigos QR online grátis',
      intro: 'Crie códigos QR para URLs, texto, credenciais WiFi e mais. Personalize cores e transfira como PNG ou SVG.',
      faq: [
        { q: 'O que posso codificar?', a: 'URLs, texto, WiFi (SSID/senha), emails, telefones e vCards.' },
      ],
      howTo: ['Escolha o tipo de conteúdo', 'Introduza os dados', 'Personalize e transfira o QR'],
    },
    'calculateur-imc': {
      title: 'Calculadora de IMC Online Grátis — Índice de Massa Corporal',
      desc: 'Calcule o seu Índice de Massa Corporal com classificação de saúde. Grátis, sem registo.',
      h1: 'Calcular Índice de Massa Corporal online',
      intro: 'Introduza peso e altura para calcular o IMC e ver a categoria de saúde. Suporta unidades métricas e imperiais.',
      faq: [
        { q: 'Qual é um IMC saudável?', a: 'IMC entre 18.5 e 24.9 é considerado peso normal.' },
      ],
      howTo: ['Introduza peso e altura', 'Escolha unidades', 'Veja IMC e categoria'],
    },
    'convertisseur-unites': {
      title: 'Conversor de Unidades Online Grátis',
      desc: 'Converta entre unidades de comprimento, peso, temperatura e mais. Grátis, sem registo.',
      h1: 'Converter unidades online grátis',
      intro: 'Converta entre unidades de comprimento, peso, temperatura, área, volume, velocidade e tempo.',
      faq: [
        { q: 'Que tipos de unidades?', a: 'Comprimento, peso, temperatura, área, volume, velocidade, tempo e mais.' },
      ],
      howTo: ['Selecione a categoria', 'Introduza o valor', 'Veja o resultado'],
    },
  },
}

/**
 * Merge French base SEO entry with locale overrides.
 * Returns a complete ToolSeoEntry for the given locale.
 */
export function getLocalizedSeo(
  slug: string,
  locale: string,
  base: ToolSeoEntry
): ToolSeoEntry {
  const overrides = seoLocaleOverrides[locale]?.[slug]
  if (!overrides) return base

  return {
    ...base,
    title: overrides.title ?? base.title,
    desc: overrides.desc ?? base.desc,
    h1: overrides.h1 ?? base.h1,
    intro: overrides.intro ?? base.intro,
    faq: overrides.faq ?? base.faq,
    howTo: overrides.howTo ?? base.howTo,
  }
}
