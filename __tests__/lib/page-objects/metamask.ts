import { Locator, Page } from '@playwright/test'
import { metamaskCreds } from '../helpers/creds'
import { click } from '../helpers/helpers'
class MetamaskObg {
  readonly page: Page
  readonly SECRET_PHRASE: Locator
  readonly NEW_PASSWORD: Locator
  readonly CONFIRM_PASSWORD: Locator
  readonly I_HAVE_READ_AND_AGREE: Locator
  readonly IMPORT_WALLET: Locator
  readonly GET_STARTED: Locator
  readonly I_AGREE: Locator
  readonly IMPORT: Locator
  readonly ALL_DONE: Locator
  readonly SECRET_WORD: Locator
  readonly METAMASK_INVESTAX_ICON: string
  readonly NEXT_BUTTON: string
  readonly CONNECT_BUTTON: string
  readonly CONNECT_NEWTWORK_BUTTON: string
  readonly NEW_NETWORK_FIELDS: string

  constructor(page: Page) {
    this.page = page
    this.GET_STARTED = page.locator('text="Get Started"')
    this.IMPORT_WALLET = page.locator('text="Import wallet"')
    this.I_AGREE = page.locator('[data-testid="page-container-footer-next"]')
    this.I_HAVE_READ_AND_AGREE = page.locator('text="I have read and agree to the "')
    this.SECRET_PHRASE = page.locator('[placeholder="Paste seed phrase from clipboard"]')
    this.NEW_PASSWORD = page.locator('[id="password"]')
    this.CONFIRM_PASSWORD = page.locator('[id="confirm-password"]')
    this.IMPORT = page.locator('button[type="submit"]')
    this.ALL_DONE = page.locator('text="All Done"')
    this.SECRET_WORD = page.locator('[class="import-srp__srp"] input[type="password"]')
    this.NEXT_BUTTON = '[class="button btn--rounded btn-primary"]'
    this.CONNECT_BUTTON = '[data-testid="page-container-footer-next"]'
    this.METAMASK_INVESTAX_ICON = '[class="permissions-redirect__icons"]'
    this.NEW_NETWORK_FIELDS = '[class="form-field__input"]'
    this.CONNECT_NEWTWORK_BUTTON = this.NEXT_BUTTON
  }

  importMetamaskAccount = async (recoveryPhrase = metamaskCreds.SECRET_WORDS, password = metamaskCreds.PASSWORD) => {
    await this.GET_STARTED.waitFor()
    await this.GET_STARTED.click()
    await this.IMPORT_WALLET.click()
    await this.I_AGREE.click()
    await this.enterRecoveryPhrase(recoveryPhrase)
    await this.NEW_PASSWORD.type(password)
    await this.CONFIRM_PASSWORD.type(password)
    await this.I_HAVE_READ_AND_AGREE.click()
    await this.IMPORT.click()
    await this.ALL_DONE.click()
    await this.page.close()
  }

  async enterRecoveryPhrase(recoveryPhrase: string) {
    const arrayOfWords = recoveryPhrase.split(' ')
    const listOfFields = await this.SECRET_WORD.elementHandles()
    for (const i in listOfFields) {
      await listOfFields[i].fill(arrayOfWords[i])
    }
  }
  confirmWalletConnection = async page => {
    await page.click(this.NEXT_BUTTON)
    await page.click(this.CONNECT_BUTTON)
  }

  addNewNetwork = async (page, settings) => {
    const metamaskUrl = page.url().split('notification')
    await page.goto(metamaskUrl[0] + '/home.html#settings/networks/add-network')
    await page.waitForSelector(this.NEW_NETWORK_FIELDS)
    const listOfFields = await page.$$(this.NEW_NETWORK_FIELDS)
    for (const i in listOfFields) {
      await listOfFields[i].fill(settings[i])
    }
    await click(this.CONNECT_NEWTWORK_BUTTON, page)
  }
}
export { MetamaskObg }
