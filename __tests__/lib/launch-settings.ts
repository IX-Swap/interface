import { chromium } from 'playwright'
import { SwapIX } from './page-objects/ixswap'
import { Metamask } from './page-objects/metamask'
import { navigate, getRequest } from './helpers/helpers'
import { ixswap } from './helpers/credentials'

async function launchPersistent() {
  const ARGS = [`--disable-extensions-except=${__dirname + '/metamask'}`, `--load-extension=${__dirname + '/metamask'}`]
  const userDataDir = ''
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ARGS,
    timeout: 50000,
    viewport: { width: 1720, height: 880 },
  })
  // Connect ot the Metamask
  const page = await context.newPage()
  await navigate(ixswap.URL, page)
  if ((await context.pages()).length === 3) {
    await context.pages()[0].close()
  }
  const metamaskPage = (await context.pages())[1]
  const metamaskAuth = new Metamask(metamaskPage)
  await getRequest('http://rinkeby-faucet.com/send?address=0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe')
  await metamaskAuth.loginToMetamask()
  await page.reload()
  await metamaskPage.close()
  const wallet = new SwapIX(page)
  await wallet.connectToWallet()
  await page.waitForTimeout(5000)
  await metamaskAuth.confirmConnection((await context.pages())[1])
  return [page, context]
}

export { launchPersistent }
