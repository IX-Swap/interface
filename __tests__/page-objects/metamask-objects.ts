import { click, typeText, getRequest, navigate, makeScreenOnError } from '../helpers/helpers'
import { auth } from './selectors/metamask'
import { metamask, ixswap } from '../testData/credentials'
import { waitUntil } from 'async-wait-until'
import { SwapIX } from './ixswap-objects'

class Metamask {
  page: any
  constructor(page) {
    this.page = page
  }

  signAgreement = async (context) => {
    try {
      const secondPage = context.pages()[1]
      await waitUntil(() => secondPage != undefined, { timeout: 2000 })
      await click(auth.buttons.SIGN, secondPage)
    } catch (error) {}
  }

  loginToMetamask = async (secretWords, page = this.page) => {
    await click(auth.buttons.GET_STARTED, page)
    // try {
    //   await page.waitForSelector('text="All Done"', { timeout: 3000 })
    //   await click('text="All Done"', page)
    // } catch {}
    await click(auth.buttons.IMPORT_WALLET, page)

    await click(auth.buttons.CONFIRM, page)

    await typeText(auth.field.SECRET_PHRASE, secretWords, page)
    await typeText(auth.field.PASSWORD, metamask.PASSWORD, page)
    await typeText(auth.field.PASSWORD_CONF, metamask.PASSWORD, page)
    await page.waitForTimeout(1000)
    await click(auth.checkbox.I_READ_AGREE, page)
    await page.waitForTimeout(1000)

    await click(auth.buttons.SUBMIT, page)
    try {
      await page.waitForSelector('text="All Done"', { timeout: 30000 })
      await click('text="All Done"', page)
    } catch {}

    await click(auth.buttons.QR_POPOVER_CLOSE, page)
    await click(auth.buttons.ETH_ENV, page)
    await click(auth.buttons.KOVAN_ENV, page)
  }

  confirmOperation = async (page = this.page) => {
    await click(auth.buttons.CONFIRM, page)
  }
  fullConnection = async (context, page, secretWords, address, topUp = true) => {
    try {
      await navigate(ixswap.URL, page)
      if ((await context.pages()).length === 3) {
        await context.pages()[0].close()
      }
      const metamaskPage = (await context.pages())[1]
      // if (topUp) {
      //   await getRequest(`http://rinkeby-faucet.com/send?address=${address}`)
      // }
      await this.loginToMetamask(secretWords, metamaskPage)
      await page.reload()
      await metamaskPage.close()
      const wallet = new SwapIX(page)
      await wallet.connectToWallet()
      // await this.confirmConnection((await context.pages())[1])
      await waitUntil(() => context.pages()[1] != undefined, { timeout: 10000 })
      await click(auth.buttons.NEXT, (await context.pages())[1])
      await click(auth.buttons.CONFIRM, (await context.pages())[1])
      await page.waitForTimeout(1000)
      await this.signAgreement(context)
      await page.waitForTimeout(1000)

      return page
    } catch (error) {
      console.error(error)
      await makeScreenOnError('LoginToMetamask-IxSwapPage', error, page)
      await makeScreenOnError('LoginToMetamask-MetamaskPage', error, context.pages()[1])

      throw new Error(`Connect to metamask error`)
    }
  }
}

export { Metamask }
