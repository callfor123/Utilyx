import { pingSearchEngines } from '../src/app/lib/search-engine-pinger';

// Run the ping function
pingSearchEngines()
  .then(() => {
    console.log('Successfully pinged search engines');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to ping search engines:', error);
    process.exit(1);
  });