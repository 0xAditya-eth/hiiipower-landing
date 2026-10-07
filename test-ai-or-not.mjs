import { chromium } from 'playwright';

const PREVIEW_URL = 'https://hiiipower-landing-git-cursor-fix-afb291-0xaditya-eths-projects.vercel.app';

async function testAIOrNot() {
  console.log('🚀 Starting AI or Not test...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  
  // Throttle network to simulate slow connection
  const page = await context.newPage();
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 50 * 1024, // 50 KB/s
    uploadThroughput: 20 * 1024,
    latency: 500 // 500ms latency
  });
  
  console.log('📱 Mobile viewport (375x667)');
  console.log('🐌 Network throttled (50 KB/s, 500ms latency)\n');
  
  // Navigate to the page
  console.log(`📍 Navigating to ${PREVIEW_URL}/ai-or-not`);
  const response = await page.goto(`${PREVIEW_URL}/ai-or-not`, { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  
  console.log(`✅ Page loaded with status: ${response.status()}`);
  
  // Take initial screenshot
  await page.screenshot({ path: '/workspace/screenshots/01-initial-load.png', fullPage: true });
  console.log('📸 Screenshot: 01-initial-load.png');
  
  // Check for redirects
  const finalUrl = page.url();
  if (finalUrl !== `${PREVIEW_URL}/ai-or-not`) {
    console.log(`⚠️  Redirected to: ${finalUrl}`);
  }
  
  // Click Start button
  console.log('\n🎮 Clicking Start button...');
  await page.waitForSelector('button:has-text("Start")', { timeout: 5000 });
  await page.click('button:has-text("Start")');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: '/workspace/screenshots/02-after-start.png', fullPage: true });
  console.log('📸 Screenshot: 02-after-start.png');
  
  // Check for spinner
  const spinnerExists = await page.locator('.animate-spin').count() > 0;
  console.log(`\n🔄 Spinner visible: ${spinnerExists}`);
  
  // Wait and check for image loading states
  console.log('\n⏳ Waiting 12 seconds to see if timeout fires...');
  const startTime = Date.now();
  
  let spinnerStillPresent = false;
  let retryButtonAppeared = false;
  let imageLoaded = false;
  
  for (let i = 0; i < 12; i++) {
    await page.waitForTimeout(1000);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    spinnerStillPresent = await page.locator('.animate-spin').count() > 0;
    retryButtonAppeared = await page.locator('button:has-text("Tap to retry")').count() > 0;
    imageLoaded = await page.locator('img[alt^="Image"]').evaluate(img => {
      return img.complete && img.naturalWidth > 0;
    }).catch(() => false);
    
    console.log(`  ${elapsed}s: spinner=${spinnerStillPresent}, retry=${retryButtonAppeared}, loaded=${imageLoaded}`);
    
    if (!spinnerStillPresent || retryButtonAppeared || imageLoaded) {
      break;
    }
  }
  
  await page.screenshot({ path: '/workspace/screenshots/03-after-wait.png', fullPage: true });
  console.log('\n📸 Screenshot: 03-after-wait.png');
  
  // Check for errors in console
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(`${msg.type()}: ${msg.text()}`));
  
  // Check network requests
  console.log('\n🌐 Checking network requests...');
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('/ai-or-not/') || request.url().includes('/_next/image')) {
      requests.push({
        url: request.url(),
        method: request.method()
      });
    }
  });
  
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/ai-or-not/') || url.includes('/_next/image')) {
      console.log(`  ${response.status()} ${response.url().substring(0, 100)}...`);
      if (response.status() === 404) {
        console.log('  ❌ 404 FOUND!');
      }
    }
  });
  
  // Reload and try again with cache
  console.log('\n🔄 Reloading with cache...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/workspace/screenshots/04-reload-with-cache.png', fullPage: true });
  console.log('📸 Screenshot: 04-reload-with-cache.png');
  
  // Check loaded state
  const loadedState = await page.evaluate(() => {
    return {
      images: Array.from(document.querySelectorAll('img[alt^="Image"]')).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      })),
      spinnerCount: document.querySelectorAll('.animate-spin').length,
      retryButtons: document.querySelectorAll('button:has-text("Tap to retry")').length
    };
  });
  
  console.log('\n📊 Final state:', JSON.stringify(loadedState, null, 2));
  
  // Check console errors
  if (consoleMessages.length > 0) {
    console.log('\n📋 Console messages:');
    consoleMessages.forEach(msg => console.log(`  ${msg}`));
  }
  
  await browser.close();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📝 SUMMARY:');
  console.log('='.repeat(60));
  if (spinnerStillPresent && !retryButtonAppeared && !imageLoaded) {
    console.log('❌ ISSUE CONFIRMED: Spinner stuck, no timeout, no retry UI');
  } else if (retryButtonAppeared) {
    console.log('✅ Timeout fired and retry UI appeared');
  } else if (imageLoaded) {
    console.log('✅ Image loaded successfully');
  }
  console.log('='.repeat(60));
}

// Create screenshots directory
import { mkdirSync } from 'fs';
try {
  mkdirSync('/workspace/screenshots', { recursive: true });
} catch (e) {}

testAIOrNot().catch(console.error);
