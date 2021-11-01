import { test } from '../lib/fixtures/fixtures'
import { click, screenshotMatching } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

test.describe('Listening', () => {
  test.beforeEach(async ({ page, dso, auth, issuanceSelectors }) => {
    await dso.followToIssuanceTab(auth)
    await click(issuanceSelectors.sections.CREATE_EXCHANGE_LISTINGS, page)
  })
  test.afterEach(async ({ page }) => {
    await page.close()
  })

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

  test('Token validation error appears', async ({ listing, textHelper }) => {
    await listing.importDso()
    await listing.fillDocumentsForm()
    await listing.fillListingPricingForm()
    await listing.fillListeningOfferingTermsForm()
    const error = await listing.checkError(textHelper.errors.tokenSymbol)
    expect(error).toBe(true)
  })

  test('TokenSymbol field should be disabled', async ({
    listing,
    issuanceSelectors,
    page
  }) => {
    await listing.importDso()
    const disabled = await page.isDisabled(
      issuanceSelectors.dso.fields.TOKEN_SYMBOL
    )
    expect(disabled).toBe(true)
  })
})
