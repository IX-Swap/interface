import { Locator } from '@playwright/test'
import { getCookies, getRequest, postRequest } from '../api/api'
import { sendMoneyToEmail } from '../api/api-body'

import { baseCreds } from '../helpers/creds'
import {
  click,
  navigate,
  shouldExist,
  typeText,
  uploadFiles,
  waitForRequestInclude,
  waitForText,
  waitNewPage
} from '../helpers/helpers'
import { text } from '../helpers/text'
import { invest } from '../selectors/invest'
import { issuance } from '../selectors/issuance'
import { kyc } from './../selectors/kyc-form'
class Invest {
  page: any
  SEARCH_FIELD: Locator
  OTP_LOCATOR: Locator
  constructor(page) {
    this.SEARCH_FIELD = page.locator(invest.fields.SEARCH)
    this.OTP_LOCATOR = page.locator(invest.fields.OTP)
    this.page = page
  }

  getValueFromOTP = async () => {
    await this.OTP_LOCATOR.click()
    await this.OTP_LOCATOR.press('Control+V')
    const val = await this.OTP_LOCATOR.getAttribute('value')
    return val
  }

  getBalance = async (cookies, userId) => {
    const resp = await getRequest(cookies, `virtual-accounts/` + userId)
    try {
      const balance = resp.data[0].documents[0].balance
      return balance
    } catch (error) {
      console.error('getBalance', error)
      console.error(resp.data[0].documents)
    }
  }

  getTokenBalance = async (cookies, userId) => {
    const resp = await getRequest(cookies, `custody/available-tokens/` + userId)
    try {
      const balance = resp.data[0].documents[0]
      return balance
    } catch (error) {
      console.log('getTokenBalance', error)
      console.log(resp.data[0].documents)
    }
  }

  fullBalances = async cookies => {
    const user1tokenBalance = await this.getTokenBalance(cookies[0], baseCreds.firstUserId)
    const user2tokenBalance = await this.getTokenBalance(cookies[1], baseCreds.secondUserId)
    const user3tokenBalance = await this.getTokenBalance(cookies[2], baseCreds.thirdUserId)

    const user1SGDBalance = await this.getBalance(cookies[0], baseCreds.firstUserId)
    const user2SGDBalance = await this.getBalance(cookies[1], baseCreds.secondUserId)
    const user3SGDBalance = await this.getBalance(cookies[2], baseCreds.thirdUserId)

    return {
      user1tokenBalance,
      user1SGDBalance,
      user2tokenBalance,
      user2SGDBalance,
      user3tokenBalance,
      user3SGDBalance
    }
  }

  checkSearch = async (searchField, words, api) => {
    await searchField.type(words)
    await waitForRequestInclude(this.page, baseCreds.BASE_API + api, 'POST')
  }

  toTheOverviewPage = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.OVERVIEW_PAGE, this.page)
  }

  goToAvailableDso = async (dsoName = 'fullDSOflow testing') => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    const searchField = await this.page.locator(invest.fields.SEARCH_DSO)
    await this.checkSearch(searchField, dsoName, 'issuance/dso/approved/list')
    await click(invest.buttons.VIEW_INVEST, this.page)
    await click(invest.buttons.INVEST_LANDING, this.page)
  }
  downloadDocument = async context => {
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
    await click(issuance.dso.listBox.CORPORATE_VALUE, this.page)
    await click(invest.checkBox.I_HAVE_READ, this.page)
    await typeText(invest.fields.OTP, '111111', this.page)
    await click(invest.buttons.SUBMIT_INVEST, this.page)
  }

  investToNFT = async () => {
    await click(invest.listBox.DESTINATION_WALLET_ADDRESS, this.page)
    await click(issuance.dso.listBox.CORPORATE_VALUE, this.page)
    await typeText(invest.fields.OTP, '111111', this.page)
    await click(invest.checkBox.I_HAVE_READ, this.page)
    await click(invest.buttons.SUBMIT_INVEST, this.page)
  }

  checkThatInvestmentLandingAvailable = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    const learnMore = await this.page.locator(invest.buttons.LEARN_MORE).last().click()
    await shouldExist(invest.LANDING_TABLES_PANEL, this.page)
  }

  toSecondaryMarket = async (link = text.requests.TOKEN_SGD_PAIR) => {
    await navigate(baseCreds.URL + link, this.page)
    await shouldExist(invest.GRAPH, this.page)
    const present = await this.page.isVisible(kyc.DIALOG_VIEW)
    if (present === true) {
      await click(invest.CHECKBOX, this.page)
      await click(invest.buttons.I_AGREE, this.page)
    }
  }

  secondMarketBuy = async (price, amount) => {
    await this.page.waitForTimeout(5000)

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

  secondMarketCancelSellOrder = async () => {
    await this.toSecondaryMarket()
    await click(invest.listBox.PAIR_NAME, this.page)
    await click(invest.listBox.IXPS_SGD_PAIR, this.page)
    await click(invest.buttons.CANCEL_ORDER, this.page)
    const exist = await waitForText(this.page, 'Order Cancelled')
    return exist
  }
  secondMarketCancelOrder = async () => {
    await this.toSecondaryMarket()
    await click(invest.buttons.CANCEL_ORDER, this.page)
    const exist = await waitForText(this.page, 'Order Cancelled')
    return exist
  }

  checkCommitmentsPage = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.PRIMARY_SECTION, this.page)
    await click(invest.ACCOUNTS_COMMITMENTS, this.page)
    await shouldExist(invest.TABLE, this.page)
  }
  checkRedirectionToCommitment = async () => {
    await click(invest.buttons.VIEW_SECOND_DSO, this.page)
    const locator = this.page.locator('[id="root"]')
    return locator
  }

  makeDeposit = async (email: string) => {
    sendMoneyToEmail['email'] = email
    const { cookies, request } = await getCookies(baseCreds.ADMIN)
    const ss = await postRequest(sendMoneyToEmail, cookies, 'virtual-accounts/admin/deposits')
    console.log(ss)
  }
}
export { Invest }
