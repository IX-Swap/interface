import { test, expect } from '../lib/fixtures/fixtures'
import { click, shouldExist, isDisabledList, navigate, typeText } from '../lib/helpers/helpers'
import { baseCreds } from '../lib/helpers/creds'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.use({ storageState: './__tests__/lib/storages/dsoStorageState.json' })

test.describe('Check functionality', () => {
  test.beforeEach(async ({ page, issuance }) => {
    await navigate(baseCreds.URL, page)
    await click(issuance.ISSUANCE_TAB, page)
    await click(issuance.sections.CREATE_DSO, page)
  })
  test('New DSO should be created ', async ({ dso }) => {
    const token = (await dso.fillDsoInformationForm()).tokenName
    await dso.fillDsoPricingForm()
    await dso.fillDsoOfferingTermsForm()
    await dso.fillDsoTeamMembersForm()
    await dso.uploadDocuments()
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
test.skip('The fields should be editable if the DSO has not started.', async ({ dso, auth }) => {
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

    test.skip('The Fields should be disabled if DSO started', async ({ page, issuance }) => {
      const result = await isDisabledList(
        [
          issuance.dso.fields.TOKEN_NAME,
          issuance.dso.fields.IDENTIFIER_CODE,
          issuance.dso.fields.LAUNCH_DATE,
          issuance.dso.fields.TOKEN_SYMBOL
        ],
        page
      )
      const network = await page.getAttribute(issuance.dso.listBox.NETWORK, 'aria-disabled')
      expect([result, network]).toStrictEqual([[true, true, true, true], 'true'])
    })

    test.skip('The fields should be disabled if Capital Structure = Debt', async ({ page, issuance }) => {
      const result = await isDisabledList(
        [issuance.dso.fields.DIVIDEND_YIELD, issuance.dso.fields.GROSS_IRR, issuance.dso.fields.EQUITY_MULTIPLE],
        page
      )
      expect(result).toStrictEqual([true, true, true])
    })
  })
})

test.describe('Commitments', () => {
  test.beforeEach(async ({ page, invest }) => {
    await page.goto(baseCreds.URL + 'app/issuance/offerings')
    await click(invest.buttons.VIEW_INVEST, page)
    await click(invest.buttons.COMMITMENTS_TAB, page)
  })
  test('The page and table should exist', async ({ page, invest }) => {
    await expect(page).toHaveURL(/app\/issuance\/offerings\/\S+\/view/g)
    await shouldExist(invest.TABLE, page)
  })
  test('Investor should received the "Capital call" message', async ({ dso }) => {
    const messageTitle = await dso.capitalCall()
    expect(messageTitle.subject).toBe('Capital call')
  })
})
test.describe('Negative tests', () => {
  test.beforeEach(async ({ page, issuance }) => {
    await navigate(baseCreds.URL, page)
    await click(issuance.ISSUANCE_TAB, page)
    await click(issuance.sections.CREATE_DSO, page)
  })

  test.afterEach(async ({ dso, page, issuance }) => {
    await click(issuance.dso.buttons.FINISH_LATER, page)
    await expect(dso.ERROR).toBeVisible()
  })

  test('Submit an empty form,the DSO should not be created', async () => {
    console.log('')
  })

  test('Submit partially filled form,the DSO should not be created', async ({ dso }) => {
    await dso.fillDsoInformationForm()
    await dso.fillDsoPricingForm()
  })

  test('Check the Token symbol limit', async ({ dso, page, issuance }) => {
    await dso.fillDsoInformationForm()
    await dso.fillDsoPricingForm()
    await dso.fillDsoOfferingTermsForm()
    await dso.fillDsoTeamMembersForm()
    await dso.uploadDocuments()
    await dso.fillVideoAndFAQform()
    await typeText(issuance.dso.fields.TOKEN_SYMBOL, 'tok', page)
    await click(issuance.dso.buttons.FINISH_LATER, page)
    await expect(dso.ERROR).toContainText('"tokenSymbol" length must be less than or equal to 6 characters long')
  })
})

// Total Fundraising Amount must be a number
