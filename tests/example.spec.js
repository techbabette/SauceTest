// @ts-check
const { test, expect } = require('@playwright/test');

test('Can log in with valid information', async ({ page, validUsername }) => {
  await page.goto('/');

  let usernameField = await page.getByTestId("username");

  usernameField.fill(validUsername);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
