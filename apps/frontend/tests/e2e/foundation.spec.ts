import { expect, test } from '@playwright/test';

test('exibe a fundação responsiva da plataforma', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Valenet Quality Hub' })).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
});
