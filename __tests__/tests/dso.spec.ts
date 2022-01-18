import { test } from '../lib/fixtures/fixtures'
import { expect } from '@playwright/test'
import { click, shouldExist, isDisabledList } from '../lib/helpers/helpers'
import { baseCreds } from '../lib/helpers/creds'

test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe('Check functionality', () => {
  test.beforeEach(async ({ page, dso, auth, issuance }) => {
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

  test.skip('(need to implement)The "Preview" should be available', async ({ dso, issuance, page }) => {
    await dso.fillDsoInformationForm()
    await dso.fillDsoPricingForm()
    await dso.fillDsoOfferingTermsForm()
    await dso.fillDsoTeamMembersForm()
    await dso.fillVideoAndFAQform()
    const preview = await page.isDisabled(issuance.dso.buttons.PREVIEW)
    expect(preview).toStrictEqual(false)
  })
})

test('DSO creation is available', async ({ dso, auth, page, issuance }) => {
  await dso.followToFundsManagement(auth, baseCreds.CREATE_DSO_MORE_OPTIONS)
  await click(issuance.dso.buttons.CREATE_DSO, page)
  await shouldExist(issuance.dso.FORM, page)
})
test('The fields should be editable if the DSO has not started.', async ({ dso, auth }) => {
  await dso.followToFundsManagement(auth, baseCreds.DSO_EDIT)
  const formsIsEdited = await dso.editDsoInformationForm()
  expect(formsIsEdited).toStrictEqual([true, true])
})

test.describe('Funds Management More Option section', () => {
  test.beforeEach(async ({ dso, auth }) => {
    await dso.followToFundsManagement(auth, baseCreds.VIEW_DSO_MORE_OPTIONS)
  })
  test('View DSO is available', async ({ issuance, page }) => {
    await click(issuance.dso.buttons.VIEW_THIS_DSO, page)
    await shouldExist(issuance.dso.DSO_INFORMATION, page)
  })

  test('View My DSOs is available', async ({ issuance, page }) => {
    await click(issuance.dso.buttons.VIEW_MY_DSO, page)
    await expect(page).toHaveURL(`${baseCreds.URL}app/issuance/offerings`)
  })

  test('Deploy Token is available', async ({ issuance, page }) => {
    await click(issuance.dso.TOKEN_DEPLOY_SECTION, page)
    await shouldExist(issuance.dso.buttons.TOKEN_DEPLOY, page)
  })

  test('DSO editing is available', async ({ page, issuance }) => {
    await click(issuance.dso.buttons.EDIT_DSO, page)
    await shouldExist(issuance.dso.FORM, page)
  })
  test.describe('Edit form', () => {
    test.beforeEach(async ({ issuance, page }) => {
      await click(issuance.dso.buttons.EDIT_DSO, page)
    })

    test('The Fields should be disabled if DSO started', async ({ page, issuance }) => {
      const result = await isDisabledList(
        [issuance.dso.fields.TOKEN_NAME, issuance.dso.fields.IDENTIFIER_CODE, issuance.dso.fields.LAUNCH_DATE, issuance.dso.fields.TOKEN_SYMBOL],
        page
      )
      const network = await page.getAttribute(issuance.dso.listBox.NETWORK, 'aria-disabled')
      expect([result, network]).toStrictEqual([[true, true, true, true], 'true'])
    })

    test('The fields should be disabled if Capital Structure = Debt', async ({ page, issuance }) => {
      const result = await isDisabledList([issuance.dso.fields.DIVIDEND_YIELD, issuance.dso.fields.GROSS_IRR, issuance.dso.fields.EQUITY_MULTIPLE], page)
      expect(result).toStrictEqual([true, true, true])
    })
  })
})

test.describe('Commitments', () => {
  test.beforeEach(async ({ dso, auth, page, invest }) => {
    await dso.followToIssuanceTab(auth)
    await click(invest.ISSUANCE_COMMITMENTS, page)
  })
  test('The page and table should exist', async ({ page, invest }) => {
    await expect(page).toHaveURL(/app\/issuance\/commitments\/\S+/g)
    await shouldExist(invest.TABLE, page)
  })

  test('Investor should received the "Capital call" message', async ({ dso }) => {
    const messageTitle = await dso.capitalCall()
    expect(messageTitle.subject).toBe('Capital call')
  })
})
