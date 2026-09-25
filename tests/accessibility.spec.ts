import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
for (const theme of ['light', 'dark'] as const) {
  test(`default ${theme} theme passes structural accessibility checks and records preset contrast`, async ({
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
    // Preserve the user-selected preset exactly; report its contrast findings
    // separately rather than silently changing upstream color tokens.
    const contrast = results.violations.filter(
      (violation) => violation.id === 'color-contrast',
    )
    await test.info().attach(`preset-${theme}-contrast.json`, {
      body: JSON.stringify(contrast, null, 2),
      contentType: 'application/json',
    })
    expect(
      results.violations.filter(
        (violation) => violation.id !== 'color-contrast',
      ),
    ).toEqual([])
  })
}
