#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REPORT_TYPES = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
};

function generateMockData(reportType) {
  const today = new Date();
  let uniqueVisitors, pageViews, sessions;
  switch (reportType) {
    case 'daily':
      uniqueVisitors = 1250;
      pageViews = 3200;
      sessions = 1400;
      break;
    case 'weekly':
      uniqueVisitors = 8500;
      pageViews = 22000;
      sessions = 9500;
      break;
    case 'monthly':
      uniqueVisitors = 35000;
      pageViews = 95000;
      sessions = 40000;
      break;
    default:
      uniqueVisitors = 0;
      pageViews = 0;
      sessions = 0;
  }

  return {
    traffic: { uniqueVisitors, pageViews, sessions },
    seo: {
      indexedPages: 78,
      topKeywords: ['compress pdf', 'pdf to jpg', 'image compressor', 'qr code generator'],
      averagePosition: 12.3,
      ctr: 3.2,
    },
    performance: {
      lcp: '2.1s',
      fid: '45ms',
      cls: '0.05',
    },
    revenue: {
      impressions: reportType === 'daily' ? 4200 : reportType === 'weekly' ? 29000 : 120000,
      clicks: reportType === 'daily' ? 38 : reportType === 'weekly' ? 250 : 1100,
      rpm: 2.5,
      earnings: reportType === 'daily' ? 10.5 : reportType === 'weekly' ? 72.5 : 300,
    },
    engagement: {
      avgSessionDuration: '2m 30s',
      bounceRate: '42%',
      pagesPerSession: 2.8,
    },
    topTools: [
      { name: 'PDF Compressor', visits: 450 },
      { name: 'QR Code Generator', visits: 320 },
      { name: 'Image Converter', visits: 298 },
      { name: 'Password Generator', visits: 210 },
      { name: 'BMI Calculator', visits: 180 },
    ],
    recommendations: [
      'Improve PDF compressor page load speed (LCP currently 2.5s).',
      'Add more video tools based on low search interest but high engagement potential.',
      'Optimize SEO for "pdf to word" keyword (currently position 15).',
    ],
  };
}

function generateMarkdown(reportType, data) {
  const date = new Date().toISOString().split('T')[0];
  let period = '';
  if (reportType === 'daily') period = `Day ${date}`;
  if (reportType === 'weekly') period = `Week starting ${date}`;
  if (reportType === 'monthly') period = `Month ${date.slice(0,7)}`;

  return `# Utilyx Analytics Report – ${period}

## Traffic
- **Unique visitors**: ${data.traffic.uniqueVisitors}
- **Page views**: ${data.traffic.pageViews}
- **Sessions**: ${data.traffic.sessions}

## SEO
- **Indexed pages**: ${data.seo.indexedPages}
- **Top keywords**: ${data.seo.topKeywords.join(', ')}
- **Average position**: ${data.seo.averagePosition}
- **Click-through rate**: ${data.seo.ctr}%

## Performance (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: ${data.performance.lcp}
- **FID (First Input Delay)**: ${data.performance.fid}
- **CLS (Cumulative Layout Shift)**: ${data.performance.cls}

## Revenue (AdSense)
- **Impressions**: ${data.revenue.impressions}
- **Clicks**: ${data.revenue.clicks}
- **RPM**: $${data.revenue.rpm}
- **Estimated earnings**: $${data.revenue.earnings}

## Engagement
- **Average session duration**: ${data.engagement.avgSessionDuration}
- **Bounce rate**: ${data.engagement.bounceRate}
- **Pages per session**: ${data.engagement.pagesPerSession}

## Top Tools by Visits
${data.topTools.map((tool, idx) => `${idx + 1}. **${tool.name}**: ${tool.visits} visits`).join('\n')}

## Recommendations
${data.recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n')}

---
*Report generated on ${new Date().toISOString()}.*
*Replace mock data with real analytics using scripts in \`scripts/analytics/\`.*
`;
}

function main() {
  const reportType = process.argv[2] || 'daily';
  if (!Object.values(REPORT_TYPES).includes(reportType)) {
    console.error(`Invalid report type. Use one of: ${Object.values(REPORT_TYPES).join(', ')}`);
    process.exit(1);
  }
  const data = generateMockData(reportType);
  const markdown = generateMarkdown(reportType, data);
  const filename = `reports/${reportType}-report-${new Date().toISOString().split('T')[0]}.md`;
  fs.writeFileSync(filename, markdown);
  console.log(`Report saved to ${filename}`);
}

if (require.main === module) {
  main();
}

module.exports = { generateMockData, generateMarkdown };
