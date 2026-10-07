import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

try {
  mkdirSync('/workspace/screenshots', { recursive: true });
} catch (e) {}

async function testSpinner(url, label) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Testing: ${label}`);
  console.log(`URL: ${url}`);
  console.log('='.repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Desktop
  console.log('\n📊 Test 1: Desktop viewport');
  let context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  let page = await context.newPage();
  
  await page.goto(`${url}/ai-or-not`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/workspace/screenshots/${label}-desktop-1-loaded.png` });
  console.log('  ✅ Page loaded');
  
  await page.click('button:has-text("Start")');
  await page.waitForTimeout(2000);
  
  const desktopSpinnerState = await page.evaluate(() => ({
    spinnerVisible: document.querySelector('.animate-spin') !== null,
    imageLoaded: Array.from(document.querySelectorAll('img[alt^="Image"]')).some(img => img.complete && img.naturalWidth > 0),
    canInteract: document.querySelector('button:has-text("AI")') !== null && !document.querySelector('button:has-text("AI")').disabled
  }));
  
  await page.screenshot({ path: `/workspace/screenshots/${label}-desktop-2-game-started.png` });
  console.log(`  Image loaded: ${desktopSpinnerState.imageLoaded}`);
  console.log(`  Spinner visible: ${desktopSpinnerState.spinnerVisible}`);
  console.log(`  Buttons enabled: ${desktopSpinnerState.canInteract}`);
  
  if (desktopSpinnerState.imageLoaded && desktopSpinnerState.spinnerVisible) {
    console.log('  ❌ BUG: Spinner still visible when image is loaded!');
  } else if (desktopSpinnerState.imageLoaded && !desktopSpinnerState.spinnerVisible) {
    console.log('  ✅ GOOD: Spinner hidden when image loaded');
  }
  
  await context.close();
  
  // Test 2: Mobile with slow network
  console.log('\n📱 Test 2: Mobile viewport with slow network');
  context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  page = await context.newPage();
  
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 100 * 1024,
    uploadThroughput: 50 * 1024,
    latency: 300
  });
  
  await page.goto(`${url}/ai-or-not`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/workspace/screenshots/${label}-mobile-1-loaded.png` });
  console.log('  ✅ Page loaded');
  
  await page.click('button:has-text("Start")');
  console.log('  ⏳ Waiting for image to load...');
  
  // Monitor spinner state over time
  for (let i = 1; i <= 8; i++) {
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => ({
      spinnerVisible: document.querySelector('.animate-spin') !== null,
      imageLoaded: Array.from(document.querySelectorAll('img[alt^="Image"]')).some(img => img.complete && img.naturalWidth > 0),
      errorVisible: document.querySelector('button:has-text("Tap to retry")') !== null
    }));
    console.log(`  ${i}s: spinner=${state.spinnerVisible}, loaded=${state.imageLoaded}, error=${state.errorVisible}`);
    
    if (i === 4 || i === 8) {
      await page.screenshot({ path: `/workspace/screenshots/${label}-mobile-2-at-${i}s.png` });
    }
    
    if (state.imageLoaded && !state.spinnerVisible) {
      console.log('  ✅ PASS: Spinner hidden after image loaded');
      break;
    } else if (state.imageLoaded && state.spinnerVisible) {
      console.log('  ❌ FAIL: Spinner still visible when image loaded!');
      await page.screenshot({ path: `/workspace/screenshots/${label}-mobile-3-BUG-spinner-stuck.png` });
      break;
    }
  }
  
  await context.close();
  
  // Test 3: Replay with cache
  console.log('\n🔄 Test 3: Replay with cache');
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();
  
  await page.goto(`${url}/ai-or-not`, { waitUntil: 'networkidle' });
  await page.click('button:has-text("Start")');
  await page.waitForTimeout(3000);
  
  // Take first guess
  const firstImageLoaded = await page.evaluate(() => {
    const img = document.querySelector('img[alt^="Image"]');
    return img && img.complete && img.naturalWidth > 0;
  });
  
  if (firstImageLoaded) {
    await page.click('button:has-text("AI")');
    console.log('  ✅ Made first guess');
    await page.waitForTimeout(2000);
    
    const secondState = await page.evaluate(() => ({
      spinnerVisible: document.querySelector('.animate-spin') !== null,
      imageLoaded: Array.from(document.querySelectorAll('img[alt^="Image"]')).some(img => img.complete && img.naturalWidth > 0)
    }));
    
    await page.screenshot({ path: `/workspace/screenshots/${label}-cache-1-second-image.png` });
    console.log(`  Second image loaded: ${secondState.imageLoaded}`);
    console.log(`  Spinner visible: ${secondState.spinnerVisible}`);
    
    if (secondState.imageLoaded && secondState.spinnerVisible) {
      console.log('  ❌ BUG: Spinner stuck on cached second image!');
    } else if (secondState.imageLoaded && !secondState.spinnerVisible) {
      console.log('  ✅ GOOD: Spinner hidden on second image');
    }
  }
  
  await context.close();
  await browser.close();
}

// Test local and preview
const tests = [
  { url: 'http://localhost:3000', label: 'local' },
  { url: 'https://hiiipower-landing-git-cursor-fix-afb291-0xaditya-eths-projects.vercel.app', label: 'preview' }
];

for (const test of tests) {
  try {
    await testSpinner(test.url, test.label);
  } catch (error) {
    console.log(`\n❌ Error testing ${test.label}:`, error.message);
  }
}

console.log('\n' + '='.repeat(70));
console.log('✅ All tests complete. Check /workspace/screenshots/ for results.');
console.log('='.repeat(70));
