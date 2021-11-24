import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { click, shouldExist } from '../lib/helpers/helpers'
import { baseCreds } from '../lib/helpers/creds'

test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe('Check functionality', () => {
  test.beforeEach(async ({ page, dso, auth, issuance }, testInfo) => {
    await dso.followToIssuanceTab(auth)
    await click(issuance.sections.CREATE_DSO, page)
  })
  test('New DSO should be created ', async ({ dso }) => {
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
})

test.describe('Funds Management More Option section', () => {
  test('View DSO is available', async ({ dso, auth, issuance, page }) => {
    await dso.followToFundsManagement(auth, baseCreds.VIEW_DSO_MORE_OPTIONS)
    await click(issuance.dso.buttons.VIEW_THIS_DSO, page)
    await shouldExist(issuance.dso.DSO_INFORMATION, page)
  })

  test('View My DSOs is available', async ({ dso, auth, issuance, page }) => {
    await dso.followToFundsManagement(auth, baseCreds.VIEW_DSO_MORE_OPTIONS)
    await click(issuance.dso.buttons.VIEW_MY_DSO, page)
    await expect(page).toHaveURL(`${baseCreds.URL}app/issuance/offerings`)
  })

  test('Deploy Token is available', async ({ dso, auth, issuance, page }) => {
    await dso.followToFundsManagement(auth, baseCreds.VIEW_DSO_MORE_OPTIONS)
    await click(issuance.dso.TOKEN_DEPLOY_SECTION, page)
    await shouldExist(issuance.dso.buttons.TOKEN_DEPLOY, page)
  })

  test('DSO creation is available', async ({ dso, auth, page, issuance }) => {
    await dso.followToFundsManagement(auth, baseCreds.CREATE_DSO_MORE_OPTIONS)
    await click(issuance.dso.buttons.CREATE_DSO, page)
    await shouldExist(issuance.dso.FORM, page)
  })

  test('DSO editing is available', async ({ dso, auth, page, issuance }) => {})
})
