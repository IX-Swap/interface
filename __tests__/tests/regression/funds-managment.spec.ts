import { baseCreds } from '../../lib/helpers/creds'
import { navigate, click } from '../../lib/helpers/helpers'
import { test, expect } from '../../lib/fixtures/fixtures'
import { adminEl } from '../../lib/selectors/admin'

test.use({ storageState: './__tests__/lib/storages/accountsStorageState.json' })

test.beforeEach(async ({ auth, page }) => {
  await navigate(baseCreds.URL, page)
  await click(adminEl.FUNDS_MANAGEMENT_SECTION, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})

test('The table should exist ', async ({ page }) => {
  const table = page.locator('id="SubFundSelect-label"')
  await expect(table).toBeDefined()
})
