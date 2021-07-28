import { click, typeText, getRequest, navigate, makeScreenOnError } from '../helpers/helpers'
import { groups, notifications } from '../helpers/text-helpers'
import { auth } from '../selectors/metamask'
import  {metamask, ixswap } from '../helpers/credentials'
import { waitUntil } from 'async-wait-until'
import { SwapIX } from './ixswap-objects'

class Metamask {
  page: any
  constructor(page) {
    this.page = page
  }
  loginToMetamask = async (page = this.page) => {
    try {
      await click(auth.buttons.GET_STARTED, page)
      await click(auth.buttons.IMPORT_WALLET, page)

      await click(auth.buttons.CONFIRM, page)

      await typeText(auth.field.SECRET_PHRASE, metamask.SECRET_WORDS, page)
      await typeText(auth.field.PASSWORD, metamask.PASSWORD, page)
      await typeText(auth.field.PASSWORD_CONF, metamask.PASSWORD, page)

      await click(auth.checkbox.I_READ_AGREE, page)
      await click(auth.buttons.SUBMIT, page)
      await click(auth.buttons.GET_STARTED, page)
      await click(auth.buttons.QR_POPOVER_CLOSE, page)
      await click(auth.buttons.ETH_ENV, page)
      await click(auth.buttons.RINKEBY_ENV, page)
    } catch (error) {
      await makeScreenOnError('loginToMetamask', error, page)
    }
  }

  confirmOperation = async (page = this.page) => {
    try {
      await click(auth.buttons.CONFIRM, page)
    } catch (error) {
      await makeScreenOnError('confirmOperation', error, page)
    }
  }
  fullConnection = async (context) => {
    const page = await context.newPage()
    await navigate(ixswap.URL, page)
    if ((await context.pages()).length === 3) {
      await context.pages()[0].close()
    }
    const metamaskPage = (await context.pages())[1]
    await getRequest('http://rinkeby-faucet.com/send?address=0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe')
    await this.loginToMetamask(metamaskPage)
    await page.reload()
    await metamaskPage.close()
    const wallet = new SwapIX(page)
    await wallet.connectToWallet()
    // await this.confirmConnection((await context.pages())[1])
    await waitUntil(() => context.pages()[1] != undefined, { timeout: 10000 })
    await click(auth.buttons.NEXT, (await context.pages())[1])
    await click(auth.buttons.CONFIRM, (await context.pages())[1])
    return page
  }
}

export { Metamask }
