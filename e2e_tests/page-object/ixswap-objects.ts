import { click, typeText, waitForText, shouldNotExist, waitNewPage } from '../helpers/helpers.js'
import { expect } from '@playwright/test'
import { amounts } from '../helpers/text-helpers'

import { pool, swap, securityToken } from './selectors/ixswap'
import { auth } from './selectors/metamask'
import { Metamask } from './metamask-objects'

import { metamask, ixswap } from '../testData/credentials'

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
        await click(pool.button.SUPPLY, this.page)
        await click(swap.button.CHOOSE_TOKEN, this.page)
        await click(swap.button.DAI_CRYPTO, this.page)
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Add To Current Liquidity Pool`)
    }
  }
  connectToWallet = async () => {
    await click(swap.button.CONNECT_WALLET, this.page)
    await click(swap.button.METAMASK_CONNECT, this.page)
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
  }
  createPool = async (sum, page = this.page) => {
    // await navigate(ixswap.URL, this.page)
    await click(pool.button.POOL_SECTION, page)
    await click(pool.button.ADD_LIQUIDITY, page)
    await typeText(pool.field.TOKEN_AMOUNT, sum, page)
    await click(swap.button.CHOOSE_TOKEN, page)
    await click(swap.button.DAI_CRYPTO, page)
  }

  removePool = async (page = this.page) => {
    await click(pool.button.POOL_SECTION, page)
    await click(pool.button.OPEN_TABLE, page)
    await click(pool.button.REMOVE_LIQUIDITY, page)
    await click(pool.button.MAX_PERCENTAGE, page)
  }
  setExpertMode = async (page = this.page) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept('confirm')
    })
    await click('[id="open-settings-dialog-button"]', page)
    await click('[id="toggle-expert-mode-button"]', page)
    await page.waitForTimeout(1000)
    await click('[data-testid="turn-on-expert-mode"]', page)
    await page.waitForTimeout(1000)
  }
  removePoolFull = async ({ page, context }) => {
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    return secondPage
  }

  createDeposit = async ({ page }) => {
    await click(securityToken.button.DEPOSIT, page)
    await typeText(pool.field.TOKEN_AMOUNT, '2', page)
    await click(securityToken.button.CREATE_DEPOSIT, page)
  }

  cancelDeposit = async ({ page }) => {
    await page.mouse.click(0, 0)
    await shouldNotExist(securityToken.DEPOSIT_POPUP, page)
    await click(securityToken.TABLE_ROW, page)
    await click(securityToken.button.CANCEL, page)
    await page.waitForTimeout(5000)
    await shouldNotExist(securityToken.DEPOSIT_POPUP, page)
    await page.waitForTimeout(5000)
    const texts = await page.innerText(securityToken.TABLE_ROW)
    expect(texts).toContain('Cancelled')
  }

  createWithdraw = async ({ page }) => {
    await click(securityToken.button.WITHDRAW, page)
    await typeText(pool.field.TOKEN_AMOUNT, '2', page)
    await click(securityToken.button.CREATE_DEPOSIT, page)
  }
}
export { SwapIX }
