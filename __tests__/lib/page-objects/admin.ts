import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { adminEl } from '../selectors/admin'
import {
  click,
  navigate,
  typeText,
  waitForRequestInclude,
  waitForText
} from '../helpers/helpers'

class Admin {
  page: any
  constructor(page) {
    this.page = page
  }
  LOADER = '[role="progressbar"]'

  getLocator = async element => {
    await this.page.waitForSelector(this.LOADER, { state: 'detached' })
    await this.page.waitForSelector(element, { state: 'attached' })
    const locator = await this.page.locator(element)
    return locator
  }

  toTheAdminSection = async () => {
    await click(authForms.buttons.PROFILE_VIEW, this.page)
    await click(adminEl.SECTION, this.page)
  }

  filterByIdentity = async () => {
    await click(adminEl.dropDown.IDENTITY_TYPE, this.page)
    await click(adminEl.dropDown.INDIVIDUAL_VALUE, this.page)
    const tableRequest = await waitForRequestInclude(
      this.page,
      'identity/list',
      'POST'
    )
    const userData = await (await tableRequest.response()).json()
    const identityType = userData.data[0].documents[0].type
    return identityType
  }

  addRights = async (rightsType, page = this.page) => {
    await click(adminEl.dropDown.IDENTITY_TYPE, page)
    await click(rightsType, page)
    await page.mouse.click(1, 100)
    await click('[role="dialog"] >> text="Ok"', page)
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
