import { click, typeText, waitForText, getText } from '../helpers/helpers.js'
import { groups, notifications } from '../helpers/text-helpers'
import { auth } from '../selectors/metamask'
import { metamask } from '../helpers/credentials'

class Metamask {
  page: any
  constructor(page) {
    this.page = page
  }
  loginToMetamask = async () => {
    await click('[data-testid="connect-wallet-from-swap"]', this.page)

    await this.page.screenshot({ path: '/home/oleksii/projects/ixswap/interface/__tests__/lib/screenshot1.png' })
    await click(auth.buttons.GET_STARTED, this.page)
    try {
      await click(auth.buttons.IMPORT_WALLET, this.page)
    } catch (error) {
      await this.page.screenshot({ path: '/home/oleksii/projects/ixswap/interface/__tests__/lib/screenshot.png' })
    }
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

    // await waitForText(notifications.ADD_GROUP, this.page)
  }

  confirmConnection = async (page) => {
    await click(auth.buttons.NEXT, page)
    await click(auth.buttons.CONFIRM_CONNECTION, page)
  }
}
export { Metamask }
