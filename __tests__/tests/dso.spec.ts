import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import {
  click,
  shouldNotExist,
  screenshotMatching
} from '../lib/helpers/helpers'

test.beforeEach(async ({ page, dso, auth, issuanceSelectors }, testInfo) => {
  await dso.followToIssuanceTab(auth)
  await click(issuanceSelectors.sections.CREATE_DSO, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})

test('New DSO should be created ', async ({ dso, page }) => {
  const token = (await dso.fillDsoInformationForm()).tokenName
  await dso.fillDsoPricingForm()
  await dso.fillDsoOfferingTermsForm()
  await dso.fillDsoTeamMembersForm()
  await dso.fillVideoAndFAQform()
  const present = await dso.checkThatTheDsoWasCreated(token)
  expect(present).toBe(true)
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
