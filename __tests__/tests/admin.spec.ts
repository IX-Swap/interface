import { baseCreds } from '../lib/helpers/creds'
import { adminEl } from '../lib/selectors/admin'
import { test, expect } from '../lib/fixtures/fixtures'
import {
  navigate,
  click,
  emailCreate,
  shouldExist,
  shouldNotExist,
  uploadFiles
} from '../lib/helpers/helpers'
import { invest } from '../lib/selectors/invest'
import { getCookies, postRequest } from '../lib/helpers/api'
import { authorizerEl } from '../lib/selectors/authorizer'
import { text } from '../lib/helpers/text'
import { kyc } from '../lib/selectors/kyc-form'

import { userRegistration } from '../lib/helpers/api'

test.beforeEach(async ({ page, auth, admin }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.ADMIN_SECTION, baseCreds.PASSWORD)
  await admin.toTheAdminSection()
})

test('The Admin section should exist', async ({ page, admin }) => {
  expect(page).toHaveURL(/.*app\/admin/g)
})
test.describe('Identities page', () => {
  test.beforeEach(async ({ page }) => {
    await click(adminEl.IDENTITIES_PAGE, page)
  })
  test('The Search should work', async ({ investment, page }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      'Lucy',
      'identity/list'
    )
    await expect(await page.locator(invest.TABLE)).toContainText('Lucy')
  })

  test('The "Created by admin" filter should work', async ({ page, admin }) => {
    await click(adminEl.checkBox.CREATED_BY_ADMIN, page)
    await expect(await page.locator(invest.ROW).first()).toContainText('Admin')
  })

  test('The "Identity Type" filter should work', async ({ page, admin }) => {
    const identityType = await admin.filterByIdentity()
    await expect(identityType).toBe('individual')
  })
})
test.describe('Users page', () => {
  test.beforeEach(async ({ page }) => {
    await click(adminEl.USERS_PAGE, page)
  })

  test.afterAll(async () => {
    const { cookies } = await getCookies(baseCreds.ADMIN_SECTION)
    await postRequest(
      { roles: 'user,accredited' },
      cookies,
      'auth/users/61dbfb32c9056c0daf9c943e/roles',
      'PATCH'
    )
  })
  test('The Search should work', async ({ investment, page }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      'Admin',
      text.requests.USERS_LIST
    )
    await expect(await page.locator(invest.TABLE)).toContainText('Admin')
  })

  test('The "Issuance" rights should be added', async ({
    investment,
    page,
    page2,
    auth,
    issuance,
    admin
  }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      'second Echange',
      text.requests.USERS_LIST
    )
    await admin.addRights(adminEl.dropDown.ISSUER_RIGHTS)
    await navigate(baseCreds.URL, page2)
    await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
    await shouldExist(issuance.ISSUANCE_TAB, page2)
  })
  test('The "Authorizer" rights should be added', async ({
    investment,
    page,
    page2,
    auth,
    admin
  }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      'second Echange',
      text.requests.USERS_LIST
    )
    await admin.addRights(adminEl.dropDown.AUTHORIZER_RIGHTS)
    await navigate(baseCreds.URL, page2)
    await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
    await shouldExist(authorizerEl.AUTHORIZER, page2)
  })

  test('The "Funds-management" rights should be added', async ({
    investment,
    page,
    page2,
    auth,
    admin
  }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      'second Echange',
      text.requests.USERS_LIST
    )
    await admin.addRights(adminEl.dropDown.FUNDMANAGER_RIGHTS)
    await navigate(baseCreds.URL, page2)
    await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
    await shouldExist('[href="/app/funds-management"]', page2)
  })
})
test.describe('Users page >> User view page', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(
      baseCreds.URL + 'app/admin/users/61dbf9f4c9056c0daf9c92ea/view',
      page
    )
  })

  test('The User should be disabled', async ({ admin, page2 }) => {
    await admin.disableUser(page2)
    await shouldExist('text="Access is denied"', page2)
  })

  test('The User should be enabled', async ({ auth, page, page2 }) => {
    await click(adminEl.buttons.ENABLE_THIS_USER, page)
    await click(adminEl.buttons.ENABLE, page)
    await navigate(baseCreds.URL, page2)
    await auth.loginWithout2fa(
      baseCreds.USER_DISABLE_ENABLE,
      baseCreds.PASSWORD,
      page2
    )
  })
})
//
test.skip('It needs to be improved after fixing bugs', async ({
  auth,
  kycForms,
  page,
  page2
}) => {
  const email = emailCreate()
  const resp = await userRegistration(email)
  await auth.confirmation(email)
  await navigate(baseCreds.URL, page2)
  await auth.loginWithout2fa(email, baseCreds.PASSWORD, page2)
  await navigate(
    baseCreds.URL + 'app/admin/users/61d70e53a4d2af0dbcfae5db/createIndividual',
    page
  )
  await click('tbody >> tr >> [role="button"]', page)
  await click(adminEl.dropDown.NO_IDENTITY, page)
  await page.pause()
  await click(adminEl.dropDown.INDIVIDUAL_VALUE, page)
  await click(adminEl.buttons.CREATE_IDENTITY, page)
  await kycForms.fillPersonalInformationForm()
  await kycForms.fillAddressForm()
  await kycForms.fillFinancialInformation()
  await kycForms.fillTaxDeclaration()
  await click(kyc.buttons.SUBMIT, page)
  await kycForms.investorStatusDeclaration('individual')
  await click(kyc.buttons.SUBMIT, page)
  await kycForms.uploadDocument(kyc.field.corporate.DOCS_INDIVIDUAL)
  await click(kyc.buttons.SUBMIT, page)

  await page.pause()
})

test.describe('Virtual Account page', () => {
  test.beforeEach(async ({ page }) => {
    await click(adminEl.VIRTUAL_ACCOUNT, page)
  })

  test('Test the ability to unassign (IXPRIME-67)', async ({
    authorizer,
    page
  }) => {
    await authorizer.createVirtualAccount(baseCreds.VIRTUAL_ACCOUNT)
    await click(adminEl.buttons.FIRST_IN_TABLE, page)
    await click('text="Yes"', page)
    await shouldExist(adminEl.UNASSIGNED_SUCCESSFULLY, page)
  })

  test('Test the ability to cancel unassigning (IXPRIME-68)', async ({
    page
  }) => {
    await click(adminEl.buttons.FIRST_IN_TABLE, page)
    await click('text="Cancel"', page)
    await shouldNotExist(adminEl.UNASSIGNED_SUCCESSFULLY, page)
  })

  for (const currency of ['USD', 'SGD']) {
    test(`Accounts should be added,${currency} (IXPRIME-77)`, async ({
      admin,
      page
    }) => {
      await click(adminEl.buttons.ADD_ACCOUNTS, page)
      const address = await admin.addAccount(currency)
      await navigate(
        baseCreds.URL + `app/admin/virtualAccount?currency=${currency}`,
        page
      )
      await click(adminEl.buttons.AVAILABLE_ACCOUNTS, page)
      expect(await admin.getLocator(invest.TABLE)).toContainText(address)
    })
  }
})

test.describe('Banners page', () => {
  test.beforeEach(async ({ page }) => {
    await click(adminEl.BANNERS_PAGE, page)
  })

  test('The Banner should be added', async ({ page, invest }) => {
    await uploadFiles(
      page,
      adminEl.fields.BANNER_IMG,
      text.docs.pathToFile,
      'no'
    )
    await shouldExist(invest.ROW, page)
  })

  test('The Banner should be deleted', async ({ page, invest }) => {
    await click('button:nth-child(2)', page)
    await shouldNotExist(invest.ROW, page)
  })
})
test.describe('Custody Management page', () => {
  test.beforeEach(async ({ page }) => {
    await click(adminEl.CUSTODY_MANAGEMENT, page)
  })

  test('The Search should work', async ({ investment, page }) => {
    await investment.checkSearch(
      await page.locator(invest.fields.SEARCH).first(),
      '0x5455D6D8ae4263d69b29d1DeD8eCD361b6498446',
      'accounts/custody-accounts/list'
    )
    await expect(await page.locator(invest.TABLE)).toContainText('0x54...8446')
  })

  test('The InvestaX sorting should work', async ({ page, admin }) => {
    ;(await admin.getLocator(invest.CHECKBOX)).last().click()
    const locator = await admin.getLocator(adminEl.TABLE)
    await expect(await locator.first()).toContainText('InvestaX')
  })

  test('The HEX sorting should work', async ({ page, admin }) => {
    await click(invest.CHECKBOX, page)
    const locator = await admin.getLocator(adminEl.TABLE)
    await expect(await locator.first()).toContainText('HEX')
  })
})
