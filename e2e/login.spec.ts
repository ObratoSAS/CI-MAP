import {test, expect} from '@playwright/test';

test('landing to dashboard flow', async ({page}) => {
  await page.goto('/es');
  await expect(page.getByRole('heading', {name: /Reimagine|Reimagina/})).toBeVisible();
});
