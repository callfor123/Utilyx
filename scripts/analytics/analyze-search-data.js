#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const searchFiles = [
  'search1.json',
  'search2.json',
  'search3.json',
  'search4.json',
  'search5.json',
  'search6.json',
  'search7.json',
  'search8.json',
];

const toolCategories = {
  pdf: ['pdf', 'compress pdf', 'merge pdf', 'convert pdf', 'pdf to word', 'pdf to jpg'],
  image: ['image', 'jpg', 'png', 'compress image', 'resize image', 'crop image', 'heic'],
  video: ['video', 'trim video', 'compress video', 'convert video', 'mp4', 'extract audio'],
  seo: ['seo', 'meta tags', 'sitemap', 'robots', 'json', 'regex'],
  text: ['text', 'word counter', 'case converter', 'diff', 'markdown', 'html'],
  generators: ['generator', 'qr code', 'password', 'uuid', 'whatsapp link', 'color picker'],
  calculators: ['calculator', 'bmi', 'age', 'unit converter', 'vat', 'discount', 'concrete'],
};

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

function countKeywordOccurrences(entries) {
  const counts = {};
  for (const category in toolCategories) {
    counts[category] = 0;
  }
  for (const entry of entries) {
    const text = (entry.name + ' ' + entry.snippet).toLowerCase();
    for (const category in toolCategories) {
      const keywords = toolCategories[category];
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          counts[category]++;
          break; // count each entry at most once per category
        }
      }
    }
  }
  return counts;
}

function main() {
  const entries = loadSearchData();
  console.log(`Total search entries: ${entries.length}`);
  const counts = countKeywordOccurrences(entries);
  console.log('\nKeyword occurrence counts by category:');
  Object.entries(counts).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  // Determine top categories
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  console.log('\nTop categories by search interest:');
  sorted.forEach(([category, count], idx) => {
    console.log(`  ${idx + 1}. ${category}: ${count} mentions`);
  });
}

if (require.main === module) {
  main();
}

module.exports = { loadSearchData, countKeywordOccurrences };
