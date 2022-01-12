import { getRequest } from '../helpers/api'
import { baseCreds } from '../helpers/creds'
import { click, navigate, shouldExist, typeText, uploadFiles, waitForRequestInclude, waitForText, waitNewPage } from '../helpers/helpers'
import { text } from '../helpers/text'
import { invest } from '../selectors/invest'
import { kyc } from './../selectors/kyc-form'
class Invest {
  page: any
  constructor(page) {
    this.page = page
  }

  getBalance = async (cookies, userId) => {
    const balance = (await getRequest(cookies, `virtual-accounts/` + userId)).data[0].documents[1].balance
    return balance
  }

  getTokenBalance = async (cookies, userId) => {
    const balance = (await getRequest(cookies, `custody/available-tokens/` + userId)).data[0].documents[3]
    return balance
  }

  fullBalances = async cookies => {
    const user1tokenBalance = await this.getTokenBalance(cookies[0], baseCreds.firstUserId)
    const user2tokenBalance = await this.getTokenBalance(cookies[1], baseCreds.secondUserId)
    const user3tokenBalance = await this.getTokenBalance(cookies[2], baseCreds.thirdUserId)

    const user1SGDnBalance = await this.getBalance(cookies[0], baseCreds.firstUserId)
    const user2SGDBalance = await this.getBalance(cookies[1], baseCreds.secondUserId)
    const user3SGDBalance = await this.getBalance(cookies[2], baseCreds.thirdUserId)

    return { user1tokenBalance, user1SGDnBalance, user2tokenBalance, user2SGDBalance, user3tokenBalance, user3SGDBalance }
  }

  checkSearch = async (searchField, words, api) => {
    await searchField.type(words)
    await waitForRequestInclude(this.page, baseCreds.BASE_API + api, 'POST')
  }

  toTheOverviewPage = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.OVERVIEW_PAGE, this.page)
  }

  goToAvailableDso = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    await click(invest.buttons.INVEST_ACCOUNT, this.page)
  }
  downloadDocument = async context => {
    await this.goToAvailableDso()
    await waitNewPage(context, this.page, invest.buttons.DOWNLOAD_DOC)
    return context.pages().length
  }
  createCustodyAddress = async () => {
    await this.goToAvailableDso()
    await click(invest.buttons.CREATE_CUSTODY_ADDRESS, this.page)
    await waitForText(this.page, text.notification.custodyAddress)
  }
  createNewInvestment = async () => {
    await this.goToAvailableDso()
    await uploadFiles(this.page, invest.fields.UPLOAD_SIGNED_DOC, text.docs.pathToFile)
    await typeText(invest.fields.NUMBER_UNITS, '10', this.page)
    await click(invest.listBox.DESTINATION_WALLET_ADDRESS, this.page)
    await click(invest.listBox.WALLET_ADDRESS_AQA_VALUE, this.page)
    await typeText(invest.fields.OTP, '111111', this.page)
    await click(invest.buttons.SUBMIT_INVEST, this.page)
  }

  checkThatInvestmentLandingAvailable = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    await click(invest.buttons.LEARN_MORE, this.page)
    await shouldExist(invest.LANDING_TABLES_PANEL, this.page)
  }

  toSecondaryMarket = async (link = text.requests.IXPS_SGD_PAIR) => {
    await navigate(baseCreds.URL + link, this.page)
    await shouldExist(invest.GRAPH, this.page)
    const present = await this.page.isVisible(kyc.DIALOG_VIEW)
    if (present === true) {
      await click(invest.CHECKBOX, this.page)
      await click(invest.buttons.I_AGREE, this.page)
    }
  }

  secondMarketBuy = async (price, amount) => {
    await typeText(invest.fields.PRICE, price, this.page)
    await typeText(invest.fields.AMOUNT, amount, this.page)
    await click(invest.buttons.PLACE_ORDER, this.page)
    await waitForRequestInclude(this.page, `${baseCreds.BASE_API}exchange/orders`, 'POST')
    const toast = await this.page.innerText(invest.TOAST_NOTIFICATIONS)
    return toast.includes('Order created')
  }

  secondMarketSell = async (price, amount) => {
    await click(invest.buttons.SELL, this.page)
    // await click(invest.listBox.PAIR_NAME, this.page)
    // await click(invest.listBox.IXPS_SGD_PAIR, this.page)
    await typeText(invest.fields.PRICE, price, this.page)
    await typeText(invest.fields.AMOUNT, amount, this.page)
    await click(invest.buttons.PLACE_ORDER, this.page)
    const toast = await this.page.innerText(invest.TOAST_NOTIFICATIONS)
    return toast.includes('Order created')
  }

  // secondMarketCancelSellOrder = async () => {
  //   await this.toSecondaryMarket()
  //   await click(invest.listBox.PAIR_NAME, this.page)
  //   await click(invest.listBox.IXPS_SGD_PAIR, this.page)
  //   await click(invest.buttons.CANCEL_ORDER, this.page)
  //   const exist = await waitForText(this.page, 'Order Cancelled')
  //   return exist
  // }
  // secondMarketCancelOrder = async () => {
  //   await this.toSecondaryMarket()
  //   await click(invest.buttons.CANCEL_ORDER, this.page)
  //   const exist = await waitForText(this.page, 'Order Cancelled')
  //   return exist
  // }

  checkCommitmentsPage = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    await click(invest.ACCOUNTS_COMMITMENTS, this.page)
    await shouldExist(invest.TABLE, this.page)
  }
  checkRedirectionToCommitment = async () => {
    await click(invest.buttons.VIEW_SECOND_DSO, this.page)
    const locator = this.page.locator('[class="MuiGrid-root fs-exclude MuiGrid-container MuiGrid-spacing-xs-4"]')
    return locator
  }
}
export { Invest }
