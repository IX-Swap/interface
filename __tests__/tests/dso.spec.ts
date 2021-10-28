import { kyc } from '../lib/selectors/kyc-form'
import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { click, shouldNotExist } from '../lib/helpers/helpers'

test.beforeEach(async ({ page, dso, auth, issuanceSelectors }, testInfo) => {
  await dso.followToIssuanceTab(auth)
  await click(issuanceSelectors.sections.CREATE_DSO, page)
})
test.afterEach(async ({ page, context }, testInfo) => {
  await page.close()
})
test.describe('Check form`s view', () => {
  test('DSO Information', async ({
    page,
    kycForms,
    issuanceSelectors
  }, testInfo) => {
    await shouldNotExist(issuanceSelectors.LOADER, page)
    await kycForms.checkAllViewUsingSnapshot(testInfo.title)
  })
})

test('Team member should be added', async ({ dso }) => {
  const inputs = await dso.addNewTeamMember()
  expect(inputs).toBe(6)
})

test('Team member should be deleted', async ({ dso }) => {
  const inputs = await dso.removeTeamMember()
  expect(inputs).toBe(0)
})

test('FAQ should be added and deleted', async ({ dso }) => {
  const inputs = await dso.addAndRemoveNewFAQ()
  expect(inputs).toStrictEqual([8, 6])
})

test('Fields video title and link should be added', async ({ dso }) => {
  const inputs = await dso.addNewVideoLinks()
  expect(inputs).toStrictEqual(8)
})

test('New DSO should be created ', async ({ page, dso }) => {
  const token = (await dso.fillDsoInformationForm()).tokenName
  await dso.fillDsoPricingForm()
  await dso.fillDsoOfferingTermsForm()
  await dso.fillDsoTeamMembersForm()
  await dso.fillVideoAndFAQform()
  const present = await dso.checkThatTheDsoWasCreated(token)
  expect(present).toBe(true)
})
