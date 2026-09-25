import { test, expect } from '@playwright/test'

test('effect controls, liquid actions, and composer stay interactive', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Effects', exact: true }).click()
  await expect(page.locator('.specimen')).toHaveCount(6)
  const send = page.getByRole('button', { name: 'Send beam message' })
  await expect(send).toBeDisabled()
  await page
    .getByRole('textbox', { name: 'Beam message' })
    .fill('Component test')
  await send.click()
  await expect(page.getByText('Message sent', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Beam message' })).toHaveValue(
    '',
  )
  await page.getByRole('button', { name: 'Stop beam' }).click()
  await expect(page.getByRole('button', { name: 'Start beam' })).toBeVisible()
  await page
    .getByRole('group', { name: 'Metal finish' })
    .getByRole('button', { name: 'gold', exact: true })
    .click()
  await expect(
    page
      .getByRole('group', { name: 'Metal finish' })
      .getByRole('button', { name: 'gold', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page
    .getByRole('group', { name: 'Orb state' })
    .getByRole('button', { name: 'solving', exact: true })
    .click()
  await expect(page.locator('.orb-pill')).toContainText('solving')
  await page.getByRole('button', { name: 'Toggle quick actions' }).click()
  await expect(
    page.getByRole('button', { name: 'Toggle quick actions' }),
  ).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('button', { name: 'Gooey copy' }).click()
  await expect(page.getByText('Copy selected', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Toggle quick actions' }),
  ).toHaveAttribute('aria-expanded', 'false')
  await expect(
    page.getByRole('button', { name: 'Gooey copy' }),
  ).not.toBeVisible()
  await page.getByRole('button', { name: 'Toggle processing' }).click()
  await expect(page.locator('.voice-surface')).toContainText('Processing')
  await page.getByRole('slider', { name: 'Voice level' }).press('ArrowRight')
  await expect(
    page.getByRole('slider', { name: 'Voice level' }),
  ).toHaveAttribute('aria-valuenow', '0.6')
  await page
    .getByRole('group', { name: 'Avatar state' })
    .getByRole('button', { name: 'sleeping', exact: true })
    .click()
  await expect(
    page
      .getByRole('group', { name: 'Avatar state' })
      .getByRole('button', { name: 'sleeping', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('motion can be paused, persists on reload, and respects the OS', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Pause animations' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off')
  await page.getByRole('button', { name: 'Resume animations' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off')
  await expect(
    page.getByRole('button', { name: 'Reduced motion enabled' }),
  ).toBeDisabled()
  await page.getByRole('button', { name: 'Toggle quick actions' }).click()
  await expect(page.getByRole('button', { name: 'Gooey copy' })).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on')
})
