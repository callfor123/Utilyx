import { pingSearchEngines } from '../src/app/lib/search-engine-pinger.js';

pingSearchEngines()
  .then(() => console.log('Ping successful'))
  .catch((error) => console.error('Ping failed:', error));