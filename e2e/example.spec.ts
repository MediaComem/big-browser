import { test, expect } from '@playwright/test';

test('has title', async ({ playwright }) => {
  const firefox = await playwright.firefox.launch();
  const firefoxContext = await firefox.newContext();
  const firefoxPage = await firefoxContext.newPage();
  await firefoxPage.goto('/');
  await expect(firefoxPage).toHaveTitle(/Big Browser/u);

  const chromium = await playwright.chromium.launch();
  const chromiumContext = await chromium.newContext();
  const chromiumPage = await chromiumContext.newPage();
  await chromiumPage.goto('/');
  await expect(chromiumPage).toHaveTitle(/Big Browser/u);

  const webkit = await playwright.webkit.launch();
  const webkitContext = await webkit.newContext();
  const webkitPage = await webkitContext.newPage();
  await webkitPage.goto('/');
  await expect(webkitPage).toHaveTitle(/Big Browser/u);
});
