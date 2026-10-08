import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function captureImages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
  });

  // Create artifacts directory
  try {
    mkdirSync(join(__dirname, 'artifacts'), { recursive: true });
  } catch (e) {
    // Directory already exists
  }

  console.log('Capturing approved design (7/10)...');
  const approvedPage = await context.newPage();
  await approvedPage.goto(`file://${join(__dirname, 'test-approved-7of10.html')}`);
  await approvedPage.waitForLoadState('networkidle');
  await approvedPage.waitForTimeout(1000); // Wait for fonts
  await approvedPage.screenshot({
    path: join(__dirname, 'artifacts/approved-7of10.png'),
    fullPage: false,
  });
  await approvedPage.close();
  console.log('✓ Saved: artifacts/approved-7of10.png');

  console.log('Capturing generated design (7/10)...');
  const testPage = await context.newPage();
  await testPage.goto(`file://${join(__dirname, 'test-share-render.html')}`);
  await testPage.waitForLoadState('networkidle');
  await testPage.waitForTimeout(1000); // Wait for fonts
  await testPage.click('button:text("Render 7/10")');
  await testPage.waitForTimeout(5000); // Wait for rendering
  
  // Export canvas as PNG
  const dataUrl7 = await testPage.evaluate(() => {
    const canvas = document.getElementById('canvas7');
    return canvas.toDataURL('image/png');
  });
  const base64Data7 = dataUrl7.replace(/^data:image\/png;base64,/, '');
  await import('fs').then(fs => {
    fs.writeFileSync(join(__dirname, 'artifacts/generated-7of10.png'), Buffer.from(base64Data7, 'base64'));
  });
  console.log('✓ Saved: artifacts/generated-7of10.png');

  console.log('Capturing generated design (10/10)...');
  await testPage.click('button:text("Render 10/10")');
  await testPage.waitForTimeout(5000); // Wait for rendering
  
  const dataUrl10 = await testPage.evaluate(() => {
    const canvas = document.getElementById('canvas10');
    return canvas.toDataURL('image/png');
  });
  const base64Data10 = dataUrl10.replace(/^data:image\/png;base64,/, '');
  await import('fs').then(fs => {
    fs.writeFileSync(join(__dirname, 'artifacts/generated-10of10.png'), Buffer.from(base64Data10, 'base64'));
  });
  await testPage.close();
  console.log('✓ Saved: artifacts/generated-10of10.png');

  await browser.close();
  
  console.log('\n✓ All captures complete!');
  console.log('Artifacts saved to: artifacts/');
  console.log('  - approved-7of10.png (reference design)');
  console.log('  - generated-7of10.png (canvas output)');
  console.log('  - generated-10of10.png (canvas output)');
}

captureImages().catch(console.error);
