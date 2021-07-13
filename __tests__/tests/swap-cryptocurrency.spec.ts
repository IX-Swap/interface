import { test, expect } from '@playwright/test'
import { click, typeText, navigate, waitForText } from '../lib/helpers/helpers'
import { SwapIX } from '../lib/page-objects/ixswap'
const Web3 = require('web3')
const provider = require('eth-provider')
const INFURA_ID = process.env.REACT_APP_INFURA_KEY

const web3 = new Web3(provider(`wss://rinkeby.infura.io/ws/v3/${INFURA_ID}`))

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
let context
let page
let wallet

test.beforeAll(async () => {
  ;[page, context] = await launchPersistent()
  wallet = new SwapIX(page)
})
test.afterAll(async () => {
  await context.close()
})
test.describe('Check that the ETH can be exchanged for DAI', () => {
  // test('Check that the ETH can be exchanged for DAI', async ({}) => {
  //   await wallet.setTypeOfCurrency()
  //   await page.waitForTimeout(2000)
  //   await wallet.currencyExchange('0.00001')
  //   await page.waitForTimeout(2000)
  //   await click(auth.buttons.I_AGREE, await context.pages()[1])
  //   await waitForText('Swap 0.00001 ETH for', page)
  // })
  test('Check that the ETH can be exchanged for DAI', async ({}) => {
    const result = await page.evaluate(() => {
      const elements = window.ethereum._state.accounts
      return elements
    })
    const ss = await web3.eth.getBalance(result[0]).then(console.log)
    await web3.eth.getStorageAt(result[0]).then(console.log)
    await web3.eth.getBlock(3150).then(console.log)
    await web3.eth.getBlockNumber().then(console.log)
  })
})
