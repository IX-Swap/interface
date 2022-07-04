import { Locator, Page, BrowserContext } from '@playwright/test'
import { waitNewPage } from '../helpers/helpers'
import { invest } from '../selectors/invest'

export class OtcTrading {
  readonly page: Page
  readonly context: BrowserContext
  readonly TRADING_PAGE: Locator
  readonly CONNECT_TO_METAMASK: Locator
  readonly CONNECT_WALLET_BUTTON: Locator
  readonly TO_MUMBAI_TESTNET: string
  readonly AMOUNT: Locator
  readonly PRICE: Locator
  readonly PLACE_ORDER: Locator
  readonly CANCEL_ORDER: Locator
  readonly SELL_BUTTON: Locator

  constructor(page: Page, context?: BrowserContext) {
    this.page = page
    this.context = context

    this.TRADING_PAGE = page.locator('[href="/app/invest/trading/:pairId"]')
    this.CONNECT_WALLET_BUTTON = page.locator('[data-testid="connect-wallet-button"]')
    this.CONNECT_TO_METAMASK = page.locator('[id="connect-METAMASK"]')
    this.TO_MUMBAI_TESTNET = '[data-testid="place-order-suffix-switch-chain"]'
    this.AMOUNT = page.locator(invest.fields.AMOUNT)
    this.PRICE = page.locator(invest.fields.PRICE)
    this.PLACE_ORDER = page.locator(invest.buttons.PLACE_ORDER)
    this.CANCEL_ORDER = this.page.locator(invest.buttons.CANCEL_ORDER)
    this.SELL_BUTTON = page.locator(invest.buttons.SELL)
  }

  connectWallet = async () => {
    await this.TRADING_PAGE.click()
    await this.CONNECT_WALLET_BUTTON.click()
    const newPage = await waitNewPage(this.context, this.page, '[id="connect-METAMASK"]')
    return newPage
  }

  async createOrder(price: string, amount: string) {
    await this.AMOUNT.fill(amount)
    await this.PRICE.fill(price)
    await this.PLACE_ORDER.click()
  }
}
