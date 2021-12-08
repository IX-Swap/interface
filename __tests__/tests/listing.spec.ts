import { test } from '../lib/fixtures/fixtures'
import { click, screenshotMatching } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

test.beforeEach(async ({ page, dso, auth, issuance }) => {
  await dso.followToIssuanceTab(auth)
  await click(issuance.sections.CREATE_EXCHANGE_LISTINGS, page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Listing', () => {
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

  test('Check the form view', async ({ issuance, page }, testInfo) => {
    const form = await page.waitForSelector(issuance.LISTING_FORM)
    await screenshotMatching(testInfo.title, form, page)
  })
})
let importedForm
test.describe('Listing with imported dso', () => {
  test.beforeEach(async ({ listing }) => {
    importedForm = await listing.importDso()
  })

  test('Team member should be deleted', async ({ listing }) => {
    const inputs = await listing.removeTeamMember()
    expect(inputs).toBe(0)
  })

  test('TokenSymbol field should be disabled', async ({ issuance, page }) => {
    const disabled = await page.isDisabled(issuance.dso.fields.TOKEN_SYMBOL)
    expect(disabled).toBe(true)
  })

  test('Token validation error appears', async ({ listing, textHelper }) => {
    await listing.fillDocumentsForm()
    await listing.fillListingPricingForm()
    await listing.fillListeningOfferingTermsForm()
    const error = await listing.checkError(textHelper.errors.tokenSymbol)
    expect(error).toBe(true)
  })

  test('Should be imported', async ({ page }, testInfo) => {
    await screenshotMatching(testInfo.title, importedForm, page)
  })
})
