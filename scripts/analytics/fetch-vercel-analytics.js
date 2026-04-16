#!/usr/bin/env node

/**
 * Fetches Vercel Analytics data for the Utilyx project.
 * Requires VERCEL_TOKEN environment variable.
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
if (!VERCEL_TOKEN) {
  console.error('Missing VERCEL_TOKEN environment variable.');
  console.error('Please set your Vercel API token.');
  process.exit(1);
}

const PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'utilyx'; // default, adjust as needed
const API_BASE = 'https://api.vercel.com';

async function fetchAnalytics(startDate, endDate) {
  const url = `${API_BASE}/v1/analytics?projectId=${PROJECT_ID}&from=${startDate}&to=${endDate}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Vercel API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function main() {
  try {
    // Default to last 7 days
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 *共计60 * 60 * 1000).toISOString().split('T')[0];
    console.log(`Fetching analytics from ${startDate} to ${endDate}...`);
    const data = await fetchAnalytics(startDate, endDate);
    // Simplify output for now
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to fetch analytics:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fetchAnalytics };
