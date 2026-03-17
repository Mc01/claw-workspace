import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, 'screenshots');
mkdirSync(screenshotsDir, { recursive: true });

const URL = 'https://chamafi-web.vercel.app';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    colorScheme: 'dark',
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  const failedRequests = [];
  const jsErrors = [];

  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on('pageerror', (err) => {
    jsErrors.push(err.message);
  });

  // Capture all JS responses and check for HTML content
  const htmlResponses = [];
  page.on('response', async (res) => {
    const url = res.url();
    const contentType = res.headers()['content-type'] || '';
    if (url.includes('_next/static') && !contentType.includes('javascript') && !contentType.includes('css') && !contentType.includes('font') && !contentType.includes('image')) {
      try {
        const body = await res.text();
        const preview = body.substring(0, 200);
        htmlResponses.push({ url, status: res.status(), contentType, preview });
      } catch(e) {}
    }
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('=== Failed Requests ===');
  if (failedRequests.length === 0) console.log('  None');
  failedRequests.forEach(r => console.log('  FAIL: ' + r.url + ' - ' + r.failure));

  console.log('\n=== JS Errors ===');
  jsErrors.forEach(e => console.log('  ERROR: ' + e));

  console.log('\n=== Unexpected HTML responses for _next/static ===');
  if (htmlResponses.length === 0) console.log('  None');
  htmlResponses.forEach(r => {
    console.log('  URL: ' + r.url);
    console.log('  Status: ' + r.status + ' ContentType: ' + r.contentType);
    console.log('  Body preview: ' + r.preview.replace(/\n/g, ' ').substring(0, 150));
    console.log('  ---');
  });

  // Get all script tags and their src
  const scripts = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script[src]')).map(s => s.src)
  );
  console.log('\n=== Script sources ===');
  scripts.forEach(s => console.log('  ' + s));

  // Check each script's response
  console.log('\n=== Checking script HTTP status ===');
  for (const src of scripts.slice(0, 15)) {
    try {
      const resp = await page.request.get(src);
      const ct = resp.headers()['content-type'] || 'unknown';
      const status = resp.status();
      const ok = ct.includes('javascript') || ct.includes('text/plain');
      if (!ok || status !== 200) {
        const body = await resp.text();
        console.log('  PROBLEM: ' + src.replace('https://chamafi-web.vercel.app', ''));
        console.log('    Status: ' + status + ' CT: ' + ct);
        console.log('    Body: ' + body.substring(0, 200));
      } else {
        console.log('  OK [' + status + ']: ' + src.replace('https://chamafi-web.vercel.app', '').substring(0, 80));
      }
    } catch(e) {
      console.log('  EXCEPTION for ' + src + ': ' + e.message);
    }
  }

  await browser.close();
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
