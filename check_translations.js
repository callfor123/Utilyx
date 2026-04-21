const fs = require('fs');

// Read tools from tools-store.ts
const toolsStoreContent = fs.readFileSync('src/lib/tools-store.ts', 'utf8');
const toolIds = [];
const lines = toolsStoreContent.split('\n');

for (const line of lines) {
  const match = line.match(/id:\s*'([a-z0-9-]+)'/);
  if (match) {
    toolIds.push(match[1]);
  }
}

console.log('Tools in store:', toolIds.length);

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
    const foundModuleKeys = Object.keys(moduleTranslations);

    console.log(`\n${langNames[lang]} (${lang}):`);
    console.log(`  Tools translated: ${foundToolKeys.length}`);
    console.log(`  Modules translated: ${foundModuleKeys.length}`);

    // Check for missing tools
    const missingTools = toolIds.filter(id => !toolTranslations[id]);
    if (missingTools.length > 0) {
      console.log(`  Missing tools: ${missingTools.join(', ')}`);
    } else {
      console.log('  All tools translated');
    }

  } catch (error) {
    console.error(`Error reading ${lang}.json:`, error.message);
  }
}