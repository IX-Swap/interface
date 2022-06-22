// import { test, expect } from '@playwright/test'
//
// import { ixswap } from '../testData/credentials'
// import { click, makeScreenOnError, navigate, screenshotMatching } from '../helpers/helpers'
//
// import { pool, settings, securityToken } from '../page-object/selectors/ixswap'
//
// test.describe.skip('All page without Metamask connection ', () => {
//   test.beforeEach(async ({ page }) => {
//     await navigate(ixswap.URL, page)
//   })
//   test.afterEach(async ({ page, context }, testInfo) => {
//     if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
//       await makeScreenOnError(testInfo.title, 'error', page)
//       await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
//     }
//     await page.close()
//   })
//   test('Swap page', async ({ page }) => {
//     await screenshotMatching('swapPage', expect, page)
//   })
//
//   test('Pool page', async ({ page }) => {
//     await click(pool.button.POOL_SECTION, page)
//     await screenshotMatching('poolPage', expect, page)
//   })
//
//   test('Pool page,add liquidity section', async ({ page }) => {
//     await click(pool.button.POOL_SECTION, page)
//     await click(pool.button.ADD_LIQUIDITY, page)
//     await screenshotMatching('addLiquidity', expect, page)
//   })
//
//   test('Settings page', async ({ page }) => {
//     await click(settings.button.OPEN_SETTINGS, page)
//     await screenshotMatching('settingsPage', expect, page)
//   })
//
//   test('Security tokens', async ({ page }) => {
//     await click(securityToken.button.OPEN_SECURITY, page)
//     await screenshotMatching('securityTokens', expect, page)
//   })
// })
