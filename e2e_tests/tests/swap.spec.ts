import { test } from '../fixtures/metamaskFixture'

test.beforeEach(async ({ kovanNetwork, topNavigationBar }) => {
  await topNavigationBar.clickSwapTradeButton();
})

test.describe('Check Swap section functions', () => {

  test.describe('Check UI swap section cases', () => {
    test('Check UI for the "Swap" section', async ({ swapTradePage }) => {
      await swapTradePage.checkSwapTittleIsVisible();
      await swapTradePage.checkGearButtonIsVisible();
      await swapTradePage.checkFirstTokenAmountInputIsVisible();
      await swapTradePage.checkSecondTokenAmountInputIsVisible();
      await swapTradePage.checkCurrencyReplaceArrowIsVisible();
      await swapTradePage.checkCurrentRateFieldIsVisible();
      await swapTradePage.checkEnterAnAmountButtonIsDisabled();
    })
  })

  test.describe('Check swap function cases', () => {
    test('Test the ability to "Swap" (Token - Token pair)', async ({ swapTradePage }) => {
      
    })
  })
})
