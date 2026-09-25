import { test, expect } from '@playwright/test'

test('renders the gallery without browser errors or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Components', exact: true }),
  ).toBeVisible()
  await expect(page.locator('.specimen')).toHaveCount(43)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.screenshot({
    path: `test-results/gallery-${test.info().project.name}.png`,
    fullPage: true,
  })
  expect(errors).toEqual([])
})

test('search and category filters return relevant components and recover from empty results', async ({
  page,
}) => {
  await page.goto('/')
  const search = page.getByRole('textbox', { name: 'Search components' })
  await search.fill('dialog')
  await expect(page.locator('.specimen')).toHaveCount(2)
  await search.fill('no-such-component')
  await expect(
    page.getByRole('heading', { name: 'No components found' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('.specimen')).toHaveCount(43)
  if (test.info().project.name === 'mobile') {
    await page.getByLabel('Category', { exact: true }).selectOption('Overlays')
  } else {
    await page.getByRole('button', { name: /^Overlays/ }).click()
  }
  await expect(page.locator('.specimen')).toHaveCount(9)
})

test('system theme follows OS changes, overrides persist, and customization resets', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.screenshot({
    path: `test-results/dark-${test.info().project.name}.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Customize', exact: true }).click()
  await page.getByRole('button', { name: 'Blue accent' }).click()
  await page.getByRole('slider', { name: 'Corner radius' }).press('ArrowRight')
  await page.reload()
  await page.getByRole('button', { name: 'Customize', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Blue accent' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(
    page.getByRole('slider', { name: 'Corner radius' }),
  ).toHaveAttribute('aria-valuenow', '12')
  await page.getByRole('button', { name: 'Reset theme settings' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect(
    page.getByRole('button', { name: 'Sage accent' }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('dialog traps focus, saves, closes with Escape, and restores focus', async ({
  page,
}) => {
  await page.goto('/')
  const trigger = page.getByRole('button', {
    name: 'Edit profile',
    exact: true,
  })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('textbox', { name: 'Name', exact: true }).fill('Sam')
  await dialog.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByText('Profile saved', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('selection, combobox, tabs, progress, pagination, and form work', async ({
  page,
}) => {
  await page.goto('/')
  const toggle = page.getByRole('switch', {
    name: 'Notifications',
    exact: true,
  })
  await expect(toggle).toBeChecked()
  await toggle.click()
  await expect(toggle).not.toBeChecked()
  await page.getByRole('combobox', { name: 'Select framework' }).click()
  await page.getByRole('option', { name: 'Vite', exact: true }).click()
  await expect(page.getByRole('combobox', { name: 'Vite' })).toBeVisible()
  await page.getByRole('tab', { name: 'Activity' }).click()
  await expect(page.getByText('Button updated · just now')).toBeVisible()
  await page.getByRole('button', { name: '+20%' }).click()
  await expect(
    page.getByRole('progressbar', { name: 'Upload progress' }),
  ).toHaveAttribute('aria-valuenow', '80')
  await page
    .locator('#pagination')
    .getByRole('link', { name: '2', exact: true })
    .click()
  await expect(page.getByText('Page 2 of 3')).toBeVisible()
  await page.locator('#form').getByLabel('Name', { exact: true }).fill('Sam')
  await page
    .locator('#form')
    .getByLabel('Email', { exact: true })
    .fill('sam@example.com')
  await page.locator('#form').getByRole('button', { name: 'Submit' }).click()
  await expect(page.getByText('Form submitted', { exact: true })).toBeVisible()
})

test('foundations and navigation are available at each viewport', async ({
  page,
}) => {
  await page.goto('/')
  if (test.info().project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page
      .getByRole('dialog')
      .getByRole('button', { name: /^Foundations/ })
      .click()
  } else {
    await page
      .locator('.view-tabs')
      .getByRole('button', { name: 'Foundations' })
      .click()
  }
  await expect(
    page.getByRole('heading', { name: 'Foundations', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Color', exact: true }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})
