import { test } from '../lib/fixtures/fixtures'
import { click, screenshotMatching } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

test.beforeEach(async ({ page, dso, auth, issuanceSelectors }, testInfo) => {
  await dso.followToIssuanceTab(auth)
  await click(issuanceSelectors.sections.CREATE_EXCHANGE_LISTINGS, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Listening', () => {
  test('Should be created and appears in the list', async ({
    listing,
    dso
  }) => {
    const token = (await listing.fillListingGeneralInformationForm()).tokenName
    await listing.fillDocumentsForm()
    await listing.addAndFillTeamMemberForm()
    await listing.fillListingPricingForm()
    await dso.fillDsoOfferingTermsForm()
    const appears = await listing.checkThatTheListingWasCreated(token)
    expect(appears).toBe(true)
  })

  test('Should be imported', async ({ listing, dso }, testInfo) => {
    const importedForm = await listing.importDso()
    await screenshotMatching(testInfo.title, importedForm)
  })
})
