#!/usr/bin/env node

/**
 * Fetches Google Analytics 4 data for Utilyx.
 * Requires a service account JSON key file or OAuth2 credentials.
 * Set GOOGLE_APPLICATION_CREDENTIALS env var to path of service account key.
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

async function fetchGA4Data() {
  // Create client
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const propertyId = process.env.GA4_PROPERTY_ID || 'YOUR-PROPERTY-ID';
  const startDate = '7daysAgo';
  const endDate = 'today';

  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    dimensions: [{ name: 'pagePath' }],
    limit: 10,
  };

  const [response] = await analyticsDataClient.runReport(request);
  console.log(JSON.stringify(response, null, 2));
}

async function main() {
  try {
    await fetchGA4Data();
  } catch (error) {
    console.error('Failed to fetch GA4 data:', error.message);
    console.error('Ensure you have set up authentication and property ID.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fetchGA4Data };
