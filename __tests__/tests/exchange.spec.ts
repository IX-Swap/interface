import { test } from '../lib/fixtures/fixtures'
import { click, navigate } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'
import { text } from '../lib/helpers/text'

import { getCookiesForAllAccounts, getRequest, postRequest } from '../lib/helpers/api'
import { baseCreds } from '../lib/helpers/creds'
import { sellOrder } from '../lib/helpers/api-body'
let cookiesUser_1, cookiesUser_2, cookiesUser_3, getBalancesBefore

test.beforeAll(async () => {
  ;[cookiesUser_1, cookiesUser_2, cookiesUser_3] = await getCookiesForAllAccounts()
})
test.beforeEach(async ({ page, investment }) => {
  getBalancesBefore = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])

  await navigate(baseCreds.URL, page)
})
test.afterEach(async ({ page, investment }) => {
  await page.close()
})
test.describe('', () => {
  test('Full match order (BUY first)', async ({ investment, auth }) => {
    // await test.step('The buy order should be created', async () => {
    //   await postRequest(buyOrder, cookiesUser_3, 'exchange/orders')
    // })
    await test.step('The sell order should be created', async () => {
      await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
      await investment.toSecondaryMarket(text.requests.IXPS_SGD_PAIR)
      await investment.secondMarketSell('10', '5')
    })
    await test.step('Check that funds have been distributed', async () => {
      const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
      expect(getBalancesBefore.user3SGDBalance.available).toEqual(getBalancesAfter.user3SGDBalance.available + 50)
      expect(getBalancesBefore.user2tokenBalance.total).toEqual(getBalancesAfter.user2tokenBalance.total + 5)
      expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 5)
      expect(getBalancesBefore.user2SGDBalance.total).toEqual(getBalancesAfter.user2SGDBalance.total - 50)
    })
  })
  test.only('Full match order (SELL first)', async ({ investment, auth }) => {
    await test.step('The sell order should be created', async () => {
      await postRequest(sellOrder, cookiesUser_3, 'exchange/orders')

      await test.step('The buy order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.IXPS_SGD_PAIR)
        await investment.secondMarketBuy('10', '5')
      })
      await test.step('Check that funds have been distributed', async () => {
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        expect(getBalancesBefore.user3SGDBalance.available).toEqual(getBalancesAfter.user3SGDBalance.available - 50)
        expect(getBalancesBefore.user2tokenBalance.total).toEqual(getBalancesAfter.user2tokenBalance.total - 5)
        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available + 5)
        expect(getBalancesBefore.user2SGDBalance.total).toEqual(getBalancesAfter.user2SGDBalance.total + 50)
      })
    })
  })
})
