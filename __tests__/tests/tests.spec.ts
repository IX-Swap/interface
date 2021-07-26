import { test } from '../lib/fixture'

import { expect } from '@playwright/test'

import { ixswap, metamask } from '../lib/helpers/credentials'
import { click, navigate, waitForText, waitNewPage } from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
import { swap, pool } from '../lib/selectors/ixswap'

// ...
let page: any
let wallet: any
let metamaskObj: any

// test.beforeEach(async (context) => {
//   metamaskObj = new Metamask(context)
//   page = await metamaskObj.fullConnection(context, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
//   wallet = new SwapIX(page)
//   await navigate(ixswap.URL, page)
// })

test('basic test', async ({ page, context }) => {
  await page.goto('https://playwright.dev/')
  const name = await page.innerText('.navbar__title')
  expect(name).toBe('Playwright')
  await page.waitForTimeout(10000)
})
