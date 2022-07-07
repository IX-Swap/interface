import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { adminEl } from '../selectors/admin'
import { click, navigate, typeText, waitForRequestInclude, waitForText, LOADER } from '../helpers/helpers'
import { Locator } from '@playwright/test'
import { invest } from '../selectors/invest'

class Admin {
  page: any
  TABLE: Locator
  UPDATE_BUTTON: Locator
  USER_VIEW_CARD: Locator
  CHANGE_BUTTON: Locator

  constructor(page) {
    this.page = page
    this.TABLE = page.locator(invest.TABLE)
    this.USER_VIEW_CARD = page.locator('[data-testid="LaunchIcon"]')
    this.UPDATE_BUTTON = page.locator("text='Update'")
    this.CHANGE_BUTTON = page.locator("text='Change'")
  }

  updatePassword = async (oldPassword, newPassword) => {
    await this.UPDATE_BUTTON.last().click()
    await typeText(authForms.fields.OLD_PASSWORD, oldPassword, this.page)
    await typeText(authForms.fields.NEW_PASSWORD, newPassword, this.page)
    await typeText(authForms.fields.CONFIRM_PASSWORD, newPassword, this.page)
    await this.CHANGE_BUTTON.last().click()
  }

  virtualAcccountsSelection = async () => {
    await click("text='Virtual Accounts list'", this.page)
    await click('[data-testid="LinkOffIcon"]', this.page)
  }
  getLocator = async element => {
    await this.page.waitForSelector(LOADER, { state: 'detached' })
    await this.page.waitForSelector(element, { state: 'visible' })
    const locator = await this.page.locator(element)
    return locator
  }

  toTheAdminSection = async () => {
    await click(authForms.buttons.PROFILE_VIEW, this.page)
    await click(adminEl.SECTION, this.page)
  }

  filterByIdentity = async identityElValue => {
    await click(adminEl.dropDown.IDENTITY_TYPE, this.page)
    await click(identityElValue, this.page)
    const tableRequest = await waitForRequestInclude(this.page, 'identity/list', 'POST')
    const userData = await (await tableRequest.response()).json()
    const identityType = userData.data[0].documents[0].type
    return identityType
  }

  addRights = async (rightsType, page = this.page) => {
    await click(adminEl.dropDown.IDENTITY_TYPE, page)
    await click(rightsType, page)
    await page.mouse.click(1, 100)
    await click(adminEl.buttons.OK, page)
  }

  disableUser = async page2 => {
    await click(adminEl.buttons.DISABLE_THIS_USER, this.page)
    await click(adminEl.buttons.DISABLE, this.page)
    await navigate(baseCreds.URL, page2)
    await typeText(authForms.fields.EMAIL, baseCreds.USER_DISABLE_ENABLE, page2)
    await typeText(authForms.fields.PASSWORD, baseCreds.PASSWORD, page2)
    await click(authForms.buttons.LOGIN, page2)
  }

  addAccount = async (currencyType = 'SGD') => {
    const addresses = Date.now().toString().slice(-11)
    if (currencyType !== 'SGD') {
      await click(adminEl.dropDown.CURRENCY, this.page)
      await click(adminEl.dropDown.CURRENCY_USD, this.page)
    }
    await typeText(adminEl.fields.COUNT_FROM, addresses + 0, this.page)
    await typeText(adminEl.fields.COUNT_TO, addresses + 1, this.page)
    await click(adminEl.buttons.CONFIRM, this.page)
    await waitForText(this.page, 'Virtual Accounts added successfully!')
    return addresses
  }
}
export { Admin }
