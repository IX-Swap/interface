import { click, typeText, makeScreenOnError, navigate, getCount } from '../helpers/helpers.js'
import { expect } from '@playwright/test'

import { pool, swap } from '../selectors/ixswap'
import { auth } from '../selectors/metamask'

import { metamask, ixswap } from '../helpers/credentials'

class SwapIX {
  page: any
  constructor(page) {
    this.page = page
  }

  addToCurrentLiquidityPool = async (amount, forNewLiquidity = true) => {
    try {
      await click(pool.button.POOL_SECTION, this.page)
      await click(pool.button.OPEN_TABLE, this.page)
      await click(pool.button.ADD_TO_LIQUIDITY, this.page)
      await typeText(pool.field.TOKEN_AMOUNT, amount, this.page)
      if (forNewLiquidity === true) {
        await click('text="Choose token"', this.page)
        await click(swap.button.DAI_CRYPTO, this.page)
      }
      await click(pool.button.SUPPLY, this.page)
    } catch (error) {
      await makeScreenOnError('addToCurrentLiquidityPool', error, this.page)
    }
  }
  connectToWallet = async () => {
    try {
      await click(swap.button.CONNECT_WALLET, this.page)
      await click(swap.button.METAMASK_CONNECT, this.page)
    } catch (error) {
      await makeScreenOnError('connectToWallet', error, this.page)
    }
  }
  setTypeOfCurrency = async (page = this.page) => {
    await click(swap.button.OUT_CURRENCY, page)
    await click(swap.button.DAI_CRYPTO, page)
    const outPutField = await page.innerHTML(swap.button.OUT_CURRENCY)
    return outPutField
  }

  currencyExchange = async (sum, page = this.page) => {
    await typeText(swap.field.CURRENCY_INPUT, sum, page)
    await click(swap.button.SWAP, page)
    // const rowSum = await getCount(swap.button.TABLE_ROW, page)
    // expect(rowSum).toBe(5)
    await click(swap.button.CONFIRM_SWAP, page)
  }
  createPool = async (sum, page = this.page) => {
    await navigate(ixswap.URL, this.page)
    await click(pool.button.POOL_SECTION, page)
    await click(pool.button.ADD_LIQUIDITY, page)
    await typeText(pool.field.TOKEN_AMOUNT, sum, page)
    await click('text="Choose token"', page)
    await click(swap.button.DAI_CRYPTO, page)
    await click(pool.button.SUPPLY, page)
  }

  removePool = async (page = this.page) => {
    try {
      await click(pool.button.POOL_SECTION, page)
      await click(pool.button.OPEN_TABLE, page)
      await click(pool.button.REMOVE_LIQUIDITY, page)
      await click(pool.button.MAX_PERCENTAGE, page)
      await click(pool.button.APPROVE_REMOVE_LIQUIDITY, page)
    } catch (error) {
      await makeScreenOnError('removePool', error, page)
    }
  }
  setExpertMode = async (page = this.page) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept('confirm')
    })
    await page.waitForTimeout(3000)

    await click('[id="open-settings-dialog-button"]', page)
    await page.waitForTimeout(3000)

    await click('[id="toggle-expert-mode-button"]', page)
    await page.waitForTimeout(3000)

    await click('[data-testid="turn-on-expert-mode"]', page)
    await page.waitForTimeout(3000)

    // } catch (error) {
    // await makeScreenOnError('setExpertMode', error, page)
    // }
  }
}
export { SwapIX }
