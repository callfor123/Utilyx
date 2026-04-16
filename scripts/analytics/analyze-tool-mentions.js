#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const searchFiles = [
  'search1.json', 'search2.json', 'search3.json', 'search4.json',
  'search5.json', 'search6.json', 'search7.json', 'search8.json',
];

function loadSearchData() {
  const entries = [];
  for (const file of searchFiles) {
    const filePath = path.join(__dirname, '..', '..', file);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    entries.push(...data);
  }
  return entries;
}

const toolKeywords = [
  'pdf', 'compress', 'merge', 'convert', 'split', 'watermark', 'sign',
  'image', 'jpg', 'png', 'webp', 'heic', 'resize', 'crop', 'edit',
  'video', 'trim', 'compress video', 'convert video', 'mp4', 'extract audio',
  'seo', 'meta tags', 'sitemap', 'robots', 'json', 'regex',
  'text', 'word counter', 'case converter', 'diff', 'markdown', 'html',
  'generator', 'qr code', 'password', 'uuid', 'whatsapp link', 'color picker',
  'calculator', 'bmi', 'age', 'unit converter', 'vat', 'discount', 'concrete',
];

function countMentions(entries) {
  const counts = {};
  toolKeywords.forEach(kw => counts[kw] = 0);
  for (const entry of entries) {
    const text = (entry.name + ' ' + entry.snippet).toLowerCase();
    for (const kw of toolKeywords) {
      if (text.includes(kw.toLowerCase())) {
        counts[kw]++;
      }
    }
  }
  return counts;
}

function main() {
  const entries = loadSearchData();
  console.log(`Total search entries: ${entries.length}`);
  const counts = countMentions(entries);
  console.log('\nTool keyword mentions:');
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([kw, count]) => {
    if (count > 0) console.log(`  ${kw}: ${count}`);
  });
  // Group by category
  const categories = {
    pdf: ['pdf', 'compress', 'merge', 'convert', 'split', 'watermark', 'sign'],
    image: ['image', 'jpg', 'png', 'webp', 'heic', 'resize', 'crop', 'edit'],
    video: ['video', 'trim', 'compress video', 'convert video', 'mp4', 'extract audio'],
    seo: ['seo', 'meta tags', 'sitemap', 'robots', 'json', 'regex'],
    text: ['text', 'word counter', 'case converter', 'diff', 'markdown', 'html'],
    generators: ['generator', 'qr code', 'password', 'uuid', 'whatsapp link', 'color picker'],
    calculators: ['calculator', 'bmi', 'age', 'unit converter', 'vat', 'discount', 'concrete'],
  };
  console.log('\nCategory totals:');
  for (const [cat, kws] of Object.entries(categories)) {
    const total = kws.reduce((sum, kw) => sum + counts[kw], 0);
    console.log(`  ${cat}: ${total}`);
  }
}

if (require.main === module) {
  main();
}
