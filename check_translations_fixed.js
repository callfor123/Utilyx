const fs = require('fs');

// Read tools from tools-store.ts
const toolsStoreContent = fs.readFileSync('src/lib/tools-store.ts', 'utf8');
const toolIds = [];
const lines = toolsStoreContent.split('\n');

// Extract tool IDs (those inside the tools arrays)
let inToolsSection = false;
for (const line of lines) {
  // Look for tool IDs within the tools arrays of each module
  const toolMatch = line.match(/id:\s*'([a-z0-9-]+)'/);
  if (toolMatch && line.includes('label:') && line.includes('description:')) {
    toolIds.push(toolMatch[1]);
  }
}

console.log('Individual tools in store:', toolIds.length);

// Check each language
const languages = ['fr', 'en', 'es', 'de', 'ar', 'pt'];
const langNames = {
  'fr': 'French',
  'en': 'English',
  'es': 'Spanish',
  'de': 'German',
  'ar': 'Arabic',
  'pt': 'Portuguese'
};

for (const lang of languages) {
  try {
    const content = JSON.parse(fs.readFileSync(`src/messages/${lang}.json`, 'utf8'));
    const toolTranslations = content.Tools || {};
    const moduleTranslations = content.Modules || {};

    const foundToolKeys = Object.keys(toolTranslations);

    console.log(`\n${langNames[lang]} (${lang}):`);
    console.log(`  Individual tools translated: ${foundToolKeys.length}`);
    console.log(`  Modules translated: ${Object.keys(moduleTranslations).length}`);

    // Check for missing individual tools
    const missingTools = toolIds.filter(id => !toolTranslations[id]);
    if (missingTools.length > 0) {
      console.log(`  Missing individual tools: ${missingTools.length}`);
      // Show first few missing tools
      console.log(`  Examples: ${missingTools.slice(0, 5).join(', ')}${missingTools.length > 5 ? '...' : ''}`);
    } else {
      console.log('  All individual tools translated');
    }

  } catch (error) {
    console.error(`Error reading ${lang}.json:`, error.message);
  }
}