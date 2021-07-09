import { click, typeText, waitForText, getText } from '../helpers/helpers.js'
import { groups, notifications } from '../helpers/text-helpers'
import { swap } from '../selectors/ixswap'
import { auth } from '../selectors/metamask'

import { metamask } from '../helpers/credentials'

class SwapIX {
  page: any
  constructor(page) {
    this.page = page
  }
  connectToWallet = async () => {
    await click(swap.button.CONNECT_WALLET, this.page)
    await click(swap.button.METAMASK_CONNECT, this.page)

    // await waitForText(notifications.ADD_GROUP, this.page)
  }
  setTypeOfCurrency = async (page = this.page) => {
    // await click(swap.field.CURRENCY_INPUT , page)
    // await click(swap.button.ETH_CRYPTO, page)
    await click(swap.button.OUT_CURRENCY, page)
    await click(swap.button.DAI_CRYPTO, page)
  }

  currencyExchange = async (sum, page = this.page) => {
    await typeText(swap.field.CURRENCY_INPUT, sum, page)
    await click(swap.button.SWAP, page)
    await click(swap.button.CONFIRM_SWAP, page)
  }
}
export { SwapIX }
