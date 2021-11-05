import { authForms } from '../selectors/auth'
import { baseCreds } from '../helpers/creds'
import { userRegistration } from '../helpers/api'
import { text } from '../helpers/text'
import { invest } from '../selectors/invest'

import {
  click,
  typeText,
  waitNewPage,
  navigate,
  waitForText,
  shouldExist,
  uploadFiles
} from '../helpers/helpers'

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
}
export { Invest }
