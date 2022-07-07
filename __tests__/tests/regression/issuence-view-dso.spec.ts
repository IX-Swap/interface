import { test, expect } from '../../lib/fixtures/fixtures'
import { click, navigate } from '../../lib/helpers/helpers'
import { baseCreds } from '../../lib/helpers/creds'
import { invest } from '../../lib/selectors/invest'
import { kyc } from '../../lib/selectors/kyc-form'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.use({ storageState: './__tests__/lib/storages/dsoStorageState.json' })

test.describe('Negative tests (IXPRIME-766)', () => {
  test.beforeEach(async ({ page, issuance }) => {
    await navigate(baseCreds.URL, page)
    await click(issuance.ISSUANCE_TAB, page)
    await click(issuance.sections.VIEW_DSO_LISTENING, page)
    await click(invest.buttons.VIEW_INVEST, page)
  })

  test.afterEach(async ({ dso, page, issuance }) => {})

  test('Test the ability to View DSO (IXPRIME-444)', async ({ dso, page }) => {
    await expect(page).toHaveURL(/app\/issuance\/offerings\/\S+\/view/g)
    await expect(dso.PROGRESS_SECTION).toBeVisible()
  })

  test('Check the ability to "Edit" at  View DSO page (IXPRIME-277)', async ({ dso, page }) => {
    await click(kyc.buttons.EDIT, page)
    const formsIsEdited = await dso.editDsoInformationForm()
    expect(formsIsEdited).toStrictEqual([true, true])
  })

  //   test('Submit partially filled form,the DSO should not be created', async ({ dso, issuance, page }) => {
  //     await click(issuance.sections.CREATE_DSO, page)
  //     await dso.fillDsoInformationForm()
  //     await dso.fillDsoPricingForm()
  //   })
})
// Total Fundraising Amount must be a number
