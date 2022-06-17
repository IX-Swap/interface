import { test } from '../lib/fixtures/fixtures'
import { navigate } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'
import { text } from '../lib/helpers/text'

import { getCookiesForAllAccounts, postRequest } from '../lib/api/api'
import { baseCreds } from '../lib/helpers/creds'
import { sellOrder, buyOrder } from '../lib/api/api-body'
let cookiesUser_1, cookiesUser_2, cookiesUser_3, getBalancesBefore, orderResponse

if (baseCreds.URL.includes('ss')) {
  test.beforeAll(async () => {
    ;[cookiesUser_1, cookiesUser_2, cookiesUser_3] = await getCookiesForAllAccounts()
  })

  test.beforeEach(async ({ page, investment }) => {
    getBalancesBefore = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
    await navigate(baseCreds.URL, page)
  })
  test.afterEach(async ({ page }) => {
    await page.close()
  })
  test.describe('Between 2 users', () => {
    test('Full match order (BUY first)', async ({ investment, auth }) => {
      await await test.step('The buy order should be created', async () => {
        await postRequest(buyOrder, cookiesUser_3, text.requests.orderExchange)
      })
      await test.step('The sell order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
        await investment.secondMarketSell('10', '5')
      })
      await test.step('Check that funds have been distributed', async () => {
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        expect(getBalancesBefore.user2tokenBalance.available).toEqual(getBalancesAfter.user2tokenBalance.available + 5)
        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 5)
        expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(getBalancesAfter.user3SGDBalance.outstanding + 50)
        expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(getBalancesAfter.user2SGDBalance.outstanding - 50)
      })
    })

    test('Full match order (SELL first)', async ({ investment, auth }) => {
      await test.step('The sell order should be created', async () => {
        await postRequest(sellOrder, cookiesUser_3, text.requests.orderExchange)
        await test.step('The buy order should be created', async () => {
          await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
          await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
          await investment.secondMarketBuy('10', '5')
        })
        await test.step('Check that funds have been distributed', async () => {
          const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
          expect(getBalancesBefore.user2tokenBalance.available).toEqual(
            getBalancesAfter.user2tokenBalance.available - 5
          )
          expect(getBalancesBefore.user3tokenBalance.available).toEqual(
            getBalancesAfter.user3tokenBalance.available + 5
          )
          expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(
            getBalancesAfter.user2SGDBalance.outstanding + 50
          )
          expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(
            getBalancesAfter.user3SGDBalance.outstanding - 50
          )
        })
      })
    })

    test('(Cancel BUY order) The user must receive the remaining money back', async ({ investment, auth }) => {
      buyOrder['price'] = 10
      buyOrder['amount'] = 6
      orderResponse = await postRequest(buyOrder, cookiesUser_3, text.requests.orderExchange)
      await test.step('The buy order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
        await investment.secondMarketSell('10', '5')
      })
      await test.step('Check that funds have been distributed', async () => {
        await postRequest(
          buyOrder,
          cookiesUser_3,
          `exchange/orders/cancel/${orderResponse.data.order.user}/${orderResponse.data.order._id}`
        )
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        expect(getBalancesBefore.user2tokenBalance.available).toEqual(getBalancesAfter.user2tokenBalance.available + 5)
        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 5)
        expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(getBalancesAfter.user2SGDBalance.outstanding - 50)
        expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(getBalancesAfter.user3SGDBalance.outstanding + 50)
      })
    })

    test('(Cancel SELL order) The user must receive the remaining money back', async ({ investment, auth }) => {
      await test.step('The sell order should be created', async () => {
        await postRequest(sellOrder, cookiesUser_3, text.requests.orderExchange)

        await test.step('The buy order should be created', async () => {
          await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
          await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
          await investment.secondMarketBuy('10', '6')
          await investment.secondMarketCancelOrder()
        })
        await test.step('Check that funds have been distributed', async () => {
          const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
          expect(getBalancesBefore.user2tokenBalance.available).toEqual(
            getBalancesAfter.user2tokenBalance.available - 5
          )
          expect(getBalancesBefore.user3tokenBalance.available).toEqual(
            getBalancesAfter.user3tokenBalance.available + 5
          )
          expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(
            getBalancesAfter.user2SGDBalance.outstanding + 50
          )
          expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(
            getBalancesAfter.user3SGDBalance.outstanding - 50
          )
        })
      })
    })

    test('Full match order (SELL with price that is lower than BID Price)', async ({ investment, auth }) => {
      await test.step('The buy order should be created', async () => {
        buyOrder['price'] = 8
        await postRequest(buyOrder, cookiesUser_3, text.requests.orderExchange)
      })
      await test.step('The sell order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
        await investment.secondMarketSell('10', '5')
      })
      await test.step('Check that funds have been distributed', async () => {
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        expect(getBalancesBefore.user2tokenBalance.available).toEqual(getBalancesAfter.user2tokenBalance.available + 5)
        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 5)
        expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(getBalancesAfter.user2SGDBalance.outstanding - 40)
        expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(getBalancesAfter.user3SGDBalance.outstanding + 40)
      })
    })

    test('Full match order (BUY with price that is higher than ASK Price)', async ({ investment, auth }) => {
      await test.step('The sell order should be created', async () => {
        await postRequest(sellOrder, cookiesUser_3, text.requests.orderExchange)
        await test.step('The buy order should be created', async () => {
          await auth.loginWithout2fa(baseCreds.secondExchange, baseCreds.PASSWORD)
          await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
          await investment.secondMarketBuy('12', '5')
        })
        await test.step('Check that funds have been distributed', async () => {
          const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
          expect(getBalancesBefore.user2tokenBalance.available).toEqual(
            getBalancesAfter.user2tokenBalance.available - 5
          )
          expect(getBalancesBefore.user3tokenBalance.available).toEqual(
            getBalancesAfter.user3tokenBalance.available + 5
          )
          expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(
            getBalancesAfter.user2SGDBalance.outstanding + 50
          )
          expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(
            getBalancesAfter.user3SGDBalance.outstanding - 50
          )
        })
      })
    })
  })

  test.describe('Between 3 users', () => {
    test('(scenario 5) Partial match 1 order and remaining BUY orders', async ({ investment, auth }) => {
      // The buy order should be created
      await postRequest(buyOrder, cookiesUser_1, text.requests.orderExchange)
      buyOrder['price'] = 9
      buyOrder['amount'] = 3
      orderResponse = await postRequest(buyOrder, cookiesUser_2, text.requests.orderExchange)
      await test.step('The sell order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.thirdExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
        await investment.secondMarketSell('10', '3')
      })
      await test.step('Check that funds have been distributed', async () => {
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        // Cancel order to clear table
        await postRequest(
          buyOrder,
          cookiesUser_2,
          `exchange/orders/cancel/${orderResponse.data.order.user}/${orderResponse.data.order._id}`
        )

        expect(getBalancesBefore.user1tokenBalance.available).toEqual(getBalancesAfter.user1tokenBalance.available + 3)
        expect(getBalancesBefore.user1SGDBalance.outstanding).toEqual(getBalancesAfter.user1SGDBalance.outstanding - 30)
        expect(getBalancesBefore.user1SGDBalance.onHold).toEqual(getBalancesAfter.user1SGDBalance.onHold + 20)

        expect(getBalancesBefore.user2tokenBalance.available).toEqual(getBalancesAfter.user2tokenBalance.available)
        expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(getBalancesAfter.user2SGDBalance.outstanding - 27)
        expect(getBalancesBefore.user2SGDBalance.onHold).toEqual(getBalancesAfter.user2SGDBalance.onHold + 27)

        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 3)
        expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(getBalancesAfter.user3SGDBalance.outstanding + 30)
      })
    })
    test('(scenario 6) Partial match 2 orders and 1 remaining BUY order', async ({ investment, auth }) => {
      orderResponse = await postRequest(sellOrder, cookiesUser_1, text.requests.orderExchange)
      sellOrder['price'] = 9
      sellOrder['amount'] = 6
      await postRequest(sellOrder, cookiesUser_2, text.requests.orderExchange)
      await test.step('The sell order should be created', async () => {
        await auth.loginWithout2fa(baseCreds.thirdExchange, baseCreds.PASSWORD)
        await investment.toSecondaryMarket(text.requests.TOKEN_SGD_PAIR)
        await investment.secondMarketBuy('10', '10')
      })
      await test.step('Check that funds have been distributed', async () => {
        const getBalancesAfter = await investment.fullBalances([cookiesUser_1, cookiesUser_2, cookiesUser_3])
        await postRequest(
          buyOrder,
          cookiesUser_1,
          `exchange/orders/cancel/${orderResponse.data.order.user}/${orderResponse.data.order._id}`
        )

        expect(getBalancesBefore.user1tokenBalance.available).toEqual(getBalancesAfter.user1tokenBalance.available + 4)
        expect(getBalancesBefore.user1SGDBalance.outstanding).toEqual(getBalancesAfter.user1SGDBalance.outstanding - 40)

        expect(getBalancesBefore.user2tokenBalance.available).toEqual(getBalancesAfter.user2tokenBalance.available + 6)
        expect(getBalancesBefore.user2SGDBalance.outstanding).toEqual(getBalancesAfter.user2SGDBalance.outstanding - 54)

        expect(getBalancesBefore.user3tokenBalance.available).toEqual(getBalancesAfter.user3tokenBalance.available - 10)
        expect(getBalancesBefore.user3SGDBalance.outstanding).toEqual(getBalancesAfter.user3SGDBalance.outstanding + 94)
      })
    })
  })
}
