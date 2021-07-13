import { click, typeText, waitForText, getText, makeScreenOnError } from '../helpers/helpers'
import { groups, notifications } from '../helpers/text-helpers'
import { auth } from '../selectors/metamask'
import { metamask } from '../helpers/credentials'

class Metamask {
  page: any
  constructor(page) {
    this.page = page
  }
  loginToMetamask = async () => {
    try {
      await click(auth.buttons.GET_STARTED, this.page)
      await click(auth.buttons.IMPORT_WALLET, this.page)

      await click(auth.buttons.I_AGREE, this.page)

      await typeText(auth.field.SECRET_PHRASE, metamask.SECRET_WORDS, this.page)
      await typeText(auth.field.PASSWORD, metamask.PASSWORD, this.page)
      await typeText(auth.field.PASSWORD_CONF, metamask.PASSWORD, this.page)

      await click(auth.checkbox.I_READ_AGREE, this.page)
      await click(auth.buttons.SUBMIT, this.page)
      await click(auth.buttons.GET_STARTED, this.page)
      await click(auth.buttons.QR_POPOVER_CLOSE, this.page)
      await click(auth.buttons.ETH_ENV, this.page)
      await click(auth.buttons.RINKEBY_ENV, this.page)
    } catch (error) {
      await makeScreenOnError('loginToMetamask', error, this.page)
    }
  }

  confirmConnection = async (page) => {
    try {
      await click(auth.buttons.NEXT, page)
      await click(auth.buttons.CONFIRM_CONNECTION, page)
    } catch (error) {
      await makeScreenOnError('confirmConnection', error, this.page)
    }
  }
}
export { Metamask }
