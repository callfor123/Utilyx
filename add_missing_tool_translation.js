const fs = require('fs');

// Translations for img-ocr tool
const imgOcrTranslations = {
  fr: { label: 'OCR Texte', description: 'Extraire le texte d\'images avec reconnaissance optique' },
  en: { label: 'OCR Text', description: 'Extract text from images with optical recognition' },
  es: { label: 'OCR Texto', description: 'Extraer texto de imágenes con reconocimiento óptico' },
  de: { label: 'OCR Text', description: 'Text aus Bildern mit optischer Erkennung extrahieren' },
  ar: { label: 'نص OCR', description: 'استخراج النص من الصور مع التعرف البصري' },
  pt: { label: 'Texto OCR', description: 'Extrair texto de imagens com reconhecimento óptico' }
};

// Languages to update
const languages = ['fr', 'en', 'es', 'de', 'ar', 'pt'];

// Update each language file
for (const lang of languages) {
  const filePath = `src/messages/${lang}.json`;
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add missing img-ocr tool if it doesn't exist
  if (content.Tools && !content.Tools['img-ocr']) {
    content.Tools['img-ocr'] = imgOcrTranslations[lang];
    console.log(`Added img-ocr to ${lang}.json`);

    // Write back the file
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
  } else if (!content.Tools) {
    console.log(`No Tools section found in ${lang}.json`);
  }
}

console.log('img-ocr translation added to all language files.');