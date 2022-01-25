import { test, expect, Page } from '@playwright/test'

const testExternalLink = async (page: Page, url: string) => {
  const newPage = await page.context().waitForEvent('page')
  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL(url)
  await newPage.close()
}

test('Web navigation', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/')

  await page.click('[data-testid="language-dropdown"]')

  await page.click('text=English')

  await page.click('button:has-text("Explore")')
  await expect(page).toHaveURL('http://127.0.0.1:3000/explore')

  await page.click('button:has-text("Downloads")')
  await expect(page).toHaveURL('http://127.0.0.1:3000/downloads')

  await Promise.all([
    testExternalLink(page, 'https://github.com/poooi/poi'),
    page.click('a[role="button"]:has-text("GitHub")'),
  ])

  await Promise.all([
    testExternalLink(page, 'https://opencollective.com/poi'),
    page.click('a[role="button"]:has-text("OpenCollective")'),
  ])
})
