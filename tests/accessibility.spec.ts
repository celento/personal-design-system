import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
for (const theme of ['light', 'dark'] as const) {
  test(`default ${theme} theme has no automated WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme })
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: 'Components', exact: true }),
    ).toBeVisible()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
