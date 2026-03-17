import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, 'screenshots');
mkdirSync(screenshotsDir, { recursive: true });

const URL = 'https://chamafi-web.vercel.app';

async function main() {
  console.log('🚀 Starting ChamaFi debug session...\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const consoleErrors = [];
  const consoleWarnings = [];
  const networkErrors = [];

  // --- Test 1: Dark mode (default) ---
  console.log('=== TEST 1: Initial Page Load (Dark Mode) ===');
  const context = await browser.newContext({
    colorScheme: 'dark',
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      consoleErrors.push(text);
      console.log('  CONSOLE ERROR: ' + text);
    } else if (type === 'warning') {
      consoleWarnings.push(text);
      console.log('  CONSOLE WARNING: ' + text);
    }
  });

  page.on('requestfailed', (req) => {
    networkErrors.push({ url: req.url(), failure: req.failure()?.errorText });
    console.log('  NETWORK FAIL: ' + req.url() + ' -- ' + req.failure()?.errorText);
  });

  page.on('pageerror', (err) => {
    consoleErrors.push('PAGE ERROR: ' + err.message);
    console.log('  PAGE ERROR: ' + err.message);
  });

  let loadOk = false;
  let httpStatus = null;
  try {
    const response = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    httpStatus = response?.status();
    console.log('  HTTP Status: ' + httpStatus);
    loadOk = response?.ok() ?? false;
    console.log('  Page loaded: ' + (loadOk ? 'YES' : 'NO'));
  } catch (e) {
    console.log('  Navigation failed: ' + e.message);
  }

  await page.waitForTimeout(2000);

  const title = await page.title();
  console.log('  Page title: "' + title + '"');

  await page.screenshot({ path: join(screenshotsDir, '01-initial-dark.png'), fullPage: true });
  console.log('  Screenshot saved: 01-initial-dark.png');

  // Dark mode check
  console.log('\n=== TEST 2: Dark Mode Rendering ===');
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  console.log('  HTML class: "' + htmlClass + '"');
  console.log('  Body background: ' + bodyBg);
  const hasDarkClass = htmlClass.includes('dark');
  console.log('  Has dark class: ' + hasDarkClass);

  // Content
  console.log('\n=== TEST 3: Page Content ===');
  const h1 = await page.locator('h1').first().textContent().catch(() => '(none)');
  const h2 = await page.locator('h2').first().textContent().catch(() => '(none)');
  console.log('  H1: "' + (h1?.trim()) + '"');
  console.log('  H2: "' + (h2?.trim()) + '"');
  const allBtns = await page.locator('button').allTextContents();
  console.log('  All buttons: ' + JSON.stringify(allBtns.map(t => t.trim()).filter(Boolean)));

  // Connect wallet
  console.log('\n=== TEST 4: Connect Wallet Button ===');
  const walletBtnSelectors = [
    'button:has-text("Connect Wallet")',
    'button:has-text("Connect")',
    'button:has-text("wallet")',
  ];

  let walletBtnFound = false;
  for (const sel of walletBtnSelectors) {
    const count = await page.locator(sel).count();
    if (count > 0) {
      walletBtnFound = true;
      console.log('  Found button: ' + sel);
      try {
        await page.locator(sel).first().scrollIntoViewIfNeeded();
        await page.locator(sel).first().click({ timeout: 5000 });
        console.log('  Clicked Connect Wallet');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: join(screenshotsDir, '02-after-connect-click.png'), fullPage: true });
        console.log('  Screenshot saved: 02-after-connect-click.png');
      } catch (e) {
        console.log('  Click failed: ' + e.message);
        await page.screenshot({ path: join(screenshotsDir, '02-connect-error.png'), fullPage: true });
      }
      break;
    }
  }
  if (!walletBtnFound) {
    console.log('  No Connect Wallet button found');
  }

  // Mobile
  console.log('\n=== TEST 5: Mobile (390x844) ===');
  const ctxMobile = await browser.newContext({ colorScheme: 'dark', viewport: { width: 390, height: 844 } });
  const pageMobile = await ctxMobile.newPage();
  await pageMobile.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await pageMobile.waitForTimeout(1500);
  await pageMobile.screenshot({ path: join(screenshotsDir, '03-mobile-dark.png'), fullPage: true });
  console.log('  Screenshot saved: 03-mobile-dark.png');
  await ctxMobile.close();

  // MiniPay simulation
  console.log('\n=== TEST 6: MiniPay Simulation ===');
  const ctxMini = await browser.newContext({
    colorScheme: 'dark',
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 MiniPay/1.0',
  });
  const pageMini = await ctxMini.newPage();
  await pageMini.addInitScript(() => {
    window.ethereum = {
      isMiniPay: true,
      isMetaMask: false,
      request: async ({ method }) => {
        if (method === 'eth_requestAccounts') return ['0x1234567890123456789012345678901234567890'];
        if (method === 'eth_chainId') return '0xa4ec';
        if (method === 'net_version') return '42220';
        return null;
      },
    };
  });
  await pageMini.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await pageMini.waitForTimeout(2000);
  await pageMini.screenshot({ path: join(screenshotsDir, '04-minipay-sim.png'), fullPage: true });
  console.log('  Screenshot saved: 04-minipay-sim.png');
  const miniButtons = await pageMini.locator('button').allTextContents();
  console.log('  MiniPay buttons: ' + JSON.stringify(miniButtons.map(t => t.trim()).filter(Boolean)));
  await ctxMini.close();

  console.log('\n========== SUMMARY ==========');
  console.log('Page loads: ' + (loadOk ? 'YES' : 'NO'));
  console.log('HTTP status: ' + httpStatus);
  console.log('Console errors: ' + consoleErrors.length);
  consoleErrors.forEach(e => console.log('  - ' + e));
  console.log('Console warnings: ' + consoleWarnings.length);
  consoleWarnings.forEach(w => console.log('  - ' + w));
  console.log('Network failures: ' + networkErrors.length);
  networkErrors.forEach(e => console.log('  - ' + e.url + ': ' + e.failure));
  console.log('Dark class on html: ' + hasDarkClass);
  console.log('Screenshots dir: ' + screenshotsDir);
  console.log('==============================');

  await browser.close();
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
