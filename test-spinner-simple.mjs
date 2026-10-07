import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

try {
  mkdirSync('/workspace/screenshots', { recursive: true });
} catch (e) {}

async function testSpinner(url, label) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Testing: ${label} - ${url}`);
  console.log('='.repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  console.log('\n1️⃣ Loading page...');
  await page.goto(`${url}/ai-or-not`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `/workspace/screenshots/${label}-01-initial.png`, fullPage: true });
  console.log('   Screenshot: 01-initial.png');
  
  console.log('\n2️⃣ Clicking Start button...');
  const startButton = page.getByRole('button', { name: 'Start' });
  await startButton.waitFor({ state: 'visible', timeout: 5000 });
  await startButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `/workspace/screenshots/${label}-02-game-started.png`, fullPage: true });
  console.log('   Screenshot: 02-game-started.png');
  
  console.log('\n3️⃣ Monitoring spinner state...');
  for (let i = 1; i <= 10; i++) {
    await page.waitForTimeout(1000);
    
    const state = await page.evaluate(() => {
      const spinner = document.querySelector('.animate-spin');
      const images = Array.from(document.querySelectorAll('img[alt*="Image"]'));
      const loadedImage = images.find(img => img.complete && img.naturalWidth > 0);
      const aiButton = document.querySelector('button');
      const errorButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Tap to retry'));
      
      return {
        spinnerVisible: spinner !== null,
        spinnerCount: document.querySelectorAll('.animate-spin').length,
        imageCount: images.length,
        imageLoaded: loadedImage !== undefined,
        imageSrc: loadedImage ? loadedImage.src.substring(0, 80) : null,
        aiButtonExists: aiButton !== null,
        errorVisible: errorButton !== null
      };
    });
    
    console.log(`   ${i}s: spinner=${state.spinnerVisible} (${state.spinnerCount}), loaded=${state.imageLoaded}, error=${state.errorVisible}`);
    
    if (i === 3 || i === 6 || i === 10) {
      await page.screenshot({ path: `/workspace/screenshots/${label}-03-at-${i}s.png`, fullPage: true });
      console.log(`   Screenshot: 03-at-${i}s.png`);
    }
    
    if (state.imageLoaded) {
      console.log(`   ℹ️  Image loaded: ${state.imageSrc}`);
      if (state.spinnerVisible) {
        console.log('   ❌ BUG FOUND: Spinner still visible when image is loaded!');
        await page.screenshot({ path: `/workspace/screenshots/${label}-04-BUG-spinner-stuck.png`, fullPage: true });
        break;
      } else {
        console.log('   ✅ PASS: Spinner correctly hidden');
        break;
      }
    }
    
    if (state.errorVisible) {
      console.log('   ⚠️  Error UI appeared (timeout fired)');
      await page.screenshot({ path: `/workspace/screenshots/${label}-05-error-ui.png`, fullPage: true });
      break;
    }
  }
  
  console.log('\n4️⃣ Testing second image (cached)...');
  const aiButton = page.getByRole('button', { name: 'AI' });
  const canClick = await aiButton.isEnabled().catch(() => false);
  
  if (canClick) {
    await aiButton.click();
    await page.waitForTimeout(1500);
    
    const secondState = await page.evaluate(() => {
      const spinner = document.querySelector('.animate-spin');
      const images = Array.from(document.querySelectorAll('img[alt*="Image"]'));
      const loadedImage = images.find(img => img.complete && img.naturalWidth > 0);
      
      return {
        spinnerVisible: spinner !== null,
        imageLoaded: loadedImage !== undefined
      };
    });
    
    await page.screenshot({ path: `/workspace/screenshots/${label}-06-second-image.png`, fullPage: true });
    console.log(`   Second image loaded: ${secondState.imageLoaded}`);
    console.log(`   Spinner visible: ${secondState.spinnerVisible}`);
    
    if (secondState.imageLoaded && secondState.spinnerVisible) {
      console.log('   ❌ BUG: Spinner stuck on second image!');
    } else if (secondState.imageLoaded) {
      console.log('   ✅ PASS: Spinner correctly hidden on second image');
    }
  }
  
  await browser.close();
}

// Test preview only (local might have the old code)
await testSpinner('https://hiiipower-landing-git-cursor-fix-afb291-0xaditya-eths-projects.vercel.app', 'preview-before-push');

console.log('\n' + '='.repeat(70));
console.log('✅ Test complete. Pushing fix and retesting...');
console.log('='.repeat(70));
