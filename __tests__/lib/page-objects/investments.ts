import {
  click,
  shouldExist,
  typeText,
  uploadFiles,
  waitForText,
  waitNewPage
} from '../helpers/helpers'
import { text } from '../helpers/text'
import { invest } from '../selectors/invest'
import { kyc } from './../selectors/kyc-form'
class Invest {
  page: any
  constructor(page) {
    this.page = page
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
    await uploadFiles(
      this.page,
      invest.fields.UPLOAD_SIGNED_DOC,
      text.docs.pathToFile
    )
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

  toSecondaryMarket = async () => {
    await click(invest.INVEST_TAB, this.page)
    await click(invest.SECOND_MARKET, this.page)
    await shouldExist(invest.GRAPH, this.page)
    const present = await this.page.isVisible(kyc.DIALOG_VIEW)
    if (present === true) {
      console.log(present)
      await click(invest.CHECKBOX, this.page)
      await click(invest.buttons.I_AGREE, this.page)
    }
  }

  secondMarketBuy = async () => {
    await this.toSecondaryMarket()
    await typeText(invest.fields.PRICE, '1', this.page)
    await typeText(invest.fields.AMOUNT, '1', this.page)
    await click(invest.buttons.PLACE_ORDER, this.page)
    const toast = await this.page.innerText(invest.TOAST_NOTIFICATIONS)
    return toast.includes('Order created')
  }

  secondMarketSell = async () => {
    await this.toSecondaryMarket()
    await click(invest.buttons.SELL, this.page)
    await click(invest.listBox.PAIR_NAME, this.page)
    await click(invest.listBox.AFHT_SGD_PAIR, this.page)
    await typeText(invest.fields.PRICE, '10000', this.page)
    await typeText(invest.fields.AMOUNT, '1', this.page)
    await click(invest.buttons.PLACE_ORDER, this.page)
    const toast = await this.page.innerText(invest.TOAST_NOTIFICATIONS)
    return toast.includes('Order created')
  }

  secondMarketCancelSellOrder = async () => {
    await this.toSecondaryMarket()
    await click(invest.listBox.PAIR_NAME, this.page)
    await click(invest.listBox.AFHT_SGD_PAIR, this.page)
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
}
export { Invest }
