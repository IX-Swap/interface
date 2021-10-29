import { test } from '../lib/fixtures/fixtures'
import { click } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

let present
let docs
test.describe.only('Check form`s view', () => {
  test.beforeEach(async ({ page, dso, auth, issuanceSelectors }, testInfo) => {
    // await dso.followToIssuanceTab(auth)
    // await click(issuanceSelectors.sections.CREATE_EXCHANGE_LISTINGS, page)
  })
  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('New Listening should be created ', async ({ listing, dso }) => {
    console.log(1, process.env.REACT_APP_API_URL)
    console.log(2, process.env.ENVIRONMENT_URL)
    console.log(3, process.env.PLAYWRIGHT_TEST_BASE_URL)

    // const token = (await listing.fillListingGeneralInformationForm()).tokenName
    // docs = await listing.fillDocumentsForm()
    // await listing.addAndFillTeamMemberForm()
    // await listing.fillListingPricingForm()
    // await dso.fillDsoOfferingTermsForm()
    // present = await listing.checkThatTheListingWasCreated(token)
  })
})

// test('Listing should displayed on the My Listings section', async ({}) => {
//   expect(present).toBe(true)
// })

// test('3 inputs on the documents section', async ({}) => {
//   expect(docs.length).toBe(3)
// })
