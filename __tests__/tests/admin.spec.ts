import { baseCreds } from '../lib/helpers/creds'
import { adminEl } from '../lib/selectors/admin'
import { test, expect } from '../lib/fixtures/fixtures'
import { navigate, click, shouldExist, shouldNotExist, uploadFiles } from '../lib/helpers/helpers'
import { invest } from '../lib/selectors/invest'
import { getCookies, postRequest } from '../lib/api/api'
import { authorizerEl } from '../lib/selectors/authorizer'
import { text } from '../lib/helpers/text'
import { authForms } from '../lib/selectors/auth'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('', () => {
  test.use({ storageState: './__tests__/lib/storages/adminStorageState.json' })

  test.beforeEach(async ({ page, admin }) => {
    await navigate(baseCreds.URL, page)
    await admin.toTheAdminSection()
  })

  test.describe.parallel('Identities page', () => {
    test.beforeEach(async ({ page }) => {
      await click(adminEl.IDENTITIES_PAGE, page)
    })

    test('The Search should work (IXPRIME-63)', async ({ investment, admin, page }) => {
      await investment.checkSearch(await page.locator(invest.fields.SEARCH).first(), 'Lucy', 'identity/list')
      await expect(admin.TABLE).toContainText('Lucy')
    })

    test('The Search should work (negative test)', async ({ investment, admin, page }) => {
      await investment.checkSearch(await page.locator(invest.fields.SEARCH).first(), 'asgdfgsdfgsdgfd', 'identity/list')
      await expect(admin.TABLE).toContainText('No Data')
    })

    test('The "Created by admin" filter should work (IXPRIME-65)', async ({ page }) => {
      await click(adminEl.checkBox.CREATED_BY_ADMIN, page)
      await expect(await page.locator(invest.ROW).first()).toContainText('Admin')
    })

    test('The "Identity Type" filter should work (IXPRIME-64)', async ({ admin }) => {
      const identityType = await admin.filterByIdentity(adminEl.dropDown.INDIVIDUAL_VALUE)
      await expect(identityType).toBe('individual')
    })

    test('Check the ability to "View Individual Identity" card (IXPRIME-83)', async ({ admin, page }) => {
      await admin.filterByIdentity(adminEl.dropDown.INDIVIDUAL_VALUE)
      await admin.USER_VIEW_CARD.first().click()
      await shouldExist('text="View Individual Identity"', page)
    })

    test('Check the ability to "View Corporate Identity" card (IXPRIME-62)', async ({ admin, page }) => {
      await admin.filterByIdentity(adminEl.dropDown.CORPORATE_VALUE)
      await admin.USER_VIEW_CARD.first().click()
      await shouldExist('text="View Corporate Identity"', page)
    })
  })

  test.describe('Users page', () => {
    test.beforeEach(async ({ page }) => {
      await click(adminEl.USERS_PAGE, page)
    })

    test.afterAll(async () => {
      const { cookies } = await getCookies(baseCreds.ADMIN_SECTION)
      await postRequest({ roles: 'user,accredited' }, cookies, text.requests.ROLES_SET, 'PATCH')
    })
    test('The Search should work', async ({ investment, page }) => {
      await investment.checkSearch(await investment.SEARCH_FIELD.first(), 'admin', text.requests.USERS_LIST)
      await expect(await page.locator(invest.TABLE)).toContainText('admin')
    })

    test('The "Issuance" rights should be added', async ({ investment, page, page2, auth, issuance, admin }) => {
      await investment.checkSearch(
        await investment.SEARCH_FIELD.first(),
        text.USER_NAME_ADMIN_TESTING,
        text.requests.USERS_LIST
      )
      await admin.addRights(adminEl.dropDown.ISSUER_RIGHTS)
      await navigate(baseCreds.URL, page2)
      await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
      await shouldExist(issuance.ISSUANCE_TAB, page2)
    })
    test('The "Authorizer" rights should be added', async ({ investment, page, page2, auth, admin }) => {
      await investment.checkSearch(
        await investment.SEARCH_FIELD.first(),
        text.USER_NAME_ADMIN_TESTING,
        text.requests.USERS_LIST
      )
      await admin.addRights(adminEl.dropDown.AUTHORIZER_RIGHTS)
      await navigate(baseCreds.URL, page2)
      await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
      await shouldExist(authorizerEl.AUTHORIZER, page2)
    })

    test('The "Funds-management" rights should be added', async ({ investment, page, page2, auth, admin }) => {
      await investment.checkSearch(
        await investment.SEARCH_FIELD.first(),
        text.USER_NAME_ADMIN_TESTING,
        text.requests.USERS_LIST
      )
      await admin.addRights(adminEl.dropDown.FUNDMANAGER_RIGHTS)
      await navigate(baseCreds.URL, page2)
      await auth.loginWithout2fa(baseCreds.RIGHTS, baseCreds.PASSWORD, page2)
      await shouldExist(adminEl.FUNDS_MANAGEMENT_SECTION, page2)
    })
  })

  test.describe('Users page >> User view page', () => {
    test.beforeEach(async ({ page }) => {
      await navigate(baseCreds.URL + text.USER_FOR_DISABLING, page)
    })

    test('The User should be disabled', async ({ admin, page2 }) => {
      await admin.disableUser(page2)
      await shouldExist('text="Access is denied"', page2)
    })

    test('The User should be enabled', async ({ auth, page, page2 }) => {
      await click(adminEl.buttons.ENABLE_THIS_USER, page)
      await click(adminEl.buttons.ENABLE, page)
      await navigate(baseCreds.URL, page2)
      await auth.loginWithout2fa(baseCreds.USER_DISABLE_ENABLE, baseCreds.PASSWORD, page2)
    })
  })

  test.describe('Virtual Account page', () => {
    test.beforeEach(async ({ page }) => {
      await click(adminEl.VIRTUAL_ACCOUNT, page)
    })

    test('Test the ability to unassign (IXPRIME-67)', async ({ authorizer, page, admin }) => {
      await authorizer.createVirtualAccount(baseCreds.VIRTUAL_ACCOUNT)
      await admin.virtualAcccountsSelection()
      await click('text="Yes"', page)
      await shouldExist(adminEl.UNASSIGNED_SUCCESSFULLY, page)
    })

    test('Test the ability to cancel unassigning (IXPRIME-68)', async ({ page, admin }) => {
      await admin.virtualAcccountsSelection()
      await click('text="Cancel"', page)
      await shouldNotExist(adminEl.UNASSIGNED_SUCCESSFULLY, page)
    })

    for (const currency of ['USD', 'SGD']) {
      test(`Accounts should be added,${currency} (IXPRIME-77)`, async ({ admin, page }) => {
        await click(adminEl.buttons.ADD_ACCOUNTS, page)
        const address = await admin.addAccount(currency)
        await navigate(baseCreds.URL + `app/admin/virtualAccount?currency=${currency}`, page)
        await click(adminEl.buttons.AVAILABLE_ACCOUNTS, page)
        const locator = page.locator(invest.TABLE)
        await expect(locator).toContainText(address)
      })
    }
  })

  test.describe('Banners page', () => {
    test.beforeEach(async ({ page }) => {
      await click(adminEl.BANNERS_PAGE, page)
    })

    test('The Banner should be added', async ({ page, invest }) => {
      await uploadFiles(page, adminEl.fields.BANNER_IMG, text.docs.pathToFile, 'no')
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
        await investment.SEARCH_FIELD.first(),
        text.ETH_ADDRESS,
        'accounts/custody-accounts/list'
      )
      await expect(await page.locator(invest.TABLE)).toContainText(text.ETH_ADDRESS_SHORT)
    })

    test('The InvestaX sorting should work', async ({ page, admin }) => {
      const checkBoxInvestaX = await page.locator(invest.CHECKBOX)
      await checkBoxInvestaX.last().click()
      const locator = await admin.getLocator(adminEl.TABLE)
      await expect(await locator.first()).toContainText('InvestaX')
    })

    test('The HEX sorting should work', async ({ page, admin }) => {
      await click(invest.CHECKBOX, page)
      const locator = await admin.getLocator(adminEl.TABLE)
      await expect(await locator.first()).toContainText('HEX')
    })
  })
})
test('Settings,password should be updated', async ({ auth, admin, page, page2 }) => {
  const { email } = await auth.submitRegistrationFormByAPI()
  await click(authForms.buttons.PROFILE_VIEW, page)
  await click(adminEl.SETTINGS, page)
  await admin.updatePassword(baseCreds.PASSWORD, baseCreds.PASSWORD + 1)
  await shouldExist('text="Successfully changed password"', page)
  await navigate(baseCreds.URL, page2)
  await auth.loginWithout2fa(email, baseCreds.PASSWORD + 1, page2)
})
