import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8787/')

  await page.click('[data-testid="language-dropdown"]')

  await page.click('text=English')

  await page.click('button:has-text("Explore")')
  await expect(page).toHaveURL('http://127.0.0.1:8787/explore')

  await page.click('button:has-text("Downloads")')
  await expect(page).toHaveURL('http://127.0.0.1:8787/downloads')

  await Promise.all([
    (async () => {
      const newPage = await page.context().waitForEvent('page')
      await newPage.waitForLoadState()
      await expect(newPage).toHaveURL('https://github.com/poooi/poi')
      await newPage.close()
    })(),
    page.click('a[role="button"]:has-text("GitHub")'),
  ])

  await Promise.all([
    page.waitForNavigation({ url: 'https://opencollective.com/poi' }),
    page.click('a[role="button"]:has-text("OpenCollective")'),
  ])
})
