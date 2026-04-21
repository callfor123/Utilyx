const fs = require('fs');

// Module definitions from tools-store.ts
const modules = [
  { id: 'pdf', label: 'PDF & Documents', description: 'Compression, fusion, conversion et signature de PDF' },
  { id: 'image', label: 'Images', description: 'Conversion, compression et extraction d\'images' },
  { id: 'video', label: 'Vidéo', description: 'Découper, compresser, convertir et éditer des vidéos' },
  { id: 'dev-seo', label: 'Dev & SEO', description: 'Outils pour développeurs et SEO' },
  { id: 'text-tools', label: 'Text Tools', description: 'Compteur de mots, convertisseur de casse et outils texte' },
  { id: 'generators', label: 'Generators', description: 'QR code, mots de passe, hash et palette de couleurs' },
  { id: 'calculators', label: 'Calculators', description: 'BMI, âge, pourcentages et conversions d\'unités' }
];

// Languages to update
const languages = ['fr', 'en', 'es', 'de', 'ar', 'pt'];

// Translations for each language
const translations = {
  fr: {
    pdf: { label: 'PDF & Documents', description: 'Compression, fusion, conversion et signature de PDF' },
    image: { label: 'Images', description: 'Conversion, compression et extraction d\'images' },
    video: { label: 'Vidéo', description: 'Découper, compresser, convertir et éditer des vidéos' },
    'dev-seo': { label: 'Dev & SEO', description: 'Outils pour développeurs et SEO' },
    'text-tools': { label: 'Text Tools', description: 'Compteur de mots, convertisseur de casse et outils texte' },
    generators: { label: 'Generators', description: 'QR code, mots de passe, hash et palette de couleurs' },
    calculators: { label: 'Calculators', description: 'BMI, âge, pourcentages et conversions d\'unités' }
  },
  en: {
    pdf: { label: 'PDF & Documents', description: 'Compress, merge, convert and protect PDFs' },
    image: { label: 'Images', description: 'Convert, compress and optimize images' },
    video: { label: 'Video', description: 'Trim, compress, convert and edit videos' },
    'dev-seo': { label: 'Dev & SEO', description: 'Developer and SEO tools' },
    'text-tools': { label: 'Text Tools', description: 'Word counter, case converter and text utilities' },
    generators: { label: 'Generators', description: 'QR codes, passwords, hashes and colors' },
    calculators: { label: 'Calculators', description: 'BMI, age, percentages and conversions' }
  },
  es: {
    pdf: { label: 'PDF y Documentos', description: 'Comprimir, fusionar, convertir y proteger PDFs' },
    image: { label: 'Imágenes', description: 'Convertir, comprimir y optimizar imágenes' },
    video: { label: 'Vídeo', description: 'Cortar, comprimir, convertir y editar vídeos' },
    'dev-seo': { label: 'Dev y SEO', description: 'Herramientas para desarrolladores y SEO' },
    'text-tools': { label: 'Herramientas de Texto', description: 'Contador de palabras, conversor y utilidades de texto' },
    generators: { label: 'Generadores', description: 'QR codes, contraseñas, hashes y colores' },
    calculators: { label: 'Calculadoras', description: 'IMC, edad, porcentajes y conversiones' }
  },
  de: {
    pdf: { label: 'PDF & Dokumente', description: 'PDFs komprimieren, zusammenfügen, konvertieren und schützen' },
    image: { label: 'Bilder', description: 'Bilder konvertieren, komprimieren und optimieren' },
    video: { label: 'Video', description: 'Videos schneiden, komprimieren, konvertieren und bearbeiten' },
    'dev-seo': { label: 'Dev & SEO', description: 'Werkzeuge für Entwickler und SEO' },
    'text-tools': { label: 'Text-Werkzeuge', description: 'Wortzähler, Groß-/Kleinschreibung und Text-Utilities' },
    generators: { label: 'Generatoren', description: 'QR-Codes, Passwörter, Hashes und Farben' },
    calculators: { label: 'Taschenrechner', description: 'BMI, Alter, Prozente und Umrechnungen' }
  },
  ar: {
    pdf: { label: 'PDF ومستندات', description: 'ضغط ودمج وتحويل وحماية PDF' },
    image: { label: 'الصور', description: 'تحويل وضغط وتحسين الصور' },
    video: { label: 'فيديو', description: 'قص وضغط وتحويل وتحرير الفيديو' },
    'dev-seo': { label: 'Dev & SEO', description: 'أدوات للمطورين وSEO' },
    'text-tools': { label: 'أدوات النص', description: 'عداد كلمات ومحول وأدوات نصية' },
    generators: { label: 'المولدات', description: 'QR code، كلمات مرور، hash وألوان' },
    calculators: { label: 'الحاسبات', description: 'BMI، عمر، نسب مئوية وتحويلات' }
  },
  pt: {
    pdf: { label: 'PDF & Documentos', description: 'Comprimir, mesclar, converter e proteger PDFs' },
    image: { label: 'Imagens', description: 'Converter, comprimir e otimizar imagens' },
    video: { label: 'Vídeo', description: 'Cortar, comprimir, converter e editar vídeos' },
    'dev-seo': { label: 'Dev & SEO', description: 'Ferramentas para desenvolvedores e SEO' },
    'text-tools': { label: 'Ferramentas de Texto', description: 'Contador de palavras, conversor e utilidades de texto' },
    generators: { label: 'Geradores', description: 'QR codes, senhas, hashes e cores' },
    calculators: { label: 'Calculadoras', description: 'IMC, idade, porcentagens e conversões' }
  }
};

// Update each language file
for (const lang of languages) {
  const filePath = `src/messages/${lang}.json`;
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add missing modules if they don't exist
  if (!content.Modules) {
    content.Modules = {};
  }

  for (const module of modules) {
    if (!content.Modules[module.id]) {
      content.Modules[module.id] = translations[lang][module.id];
      console.log(`Added ${module.id} to ${lang}.json`);
    }
  }

  // Write back the file
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
}

console.log('Module translations added to all language files.');