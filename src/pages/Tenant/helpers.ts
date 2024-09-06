import { routes } from 'utils/routes'

const defaults = [routes.send, routes.faucet, routes.staking, routes.vesting, routes.launchpad]

interface PagesConfig {
  dex: boolean
  kyc: boolean
  lbp: boolean
  lbpAdmin: boolean
  offer: boolean
  issuance: boolean
  payout: boolean
  securityTokens: boolean
  admin: boolean
}

interface PagesGroup {
  [key: string]: string[]
}

export const pagesGroup: PagesGroup = {
  admin: [
    routes.adminDashboard,
    routes.admin(),
    routes.adminKYC,
    routes.adminKYCID,
    routes.adminAccreditation,
    routes.adminUsers,
    routes.adminTransactions,
    routes.adminCatalog,
    routes.tenant,
    routes.tenantCreate,
  ],
  dex: [routes.swap, routes.pool, routes.find, routes.swapOutputCurrency, routes.addCurrency, routes.removeCurrency],
  kyc: [routes.kyc, routes.kycIndividual, routes.kycIndividualV2, routes.kycCorporate],
  lbp: [routes.publicDetails],
  offer: [routes.offerPage],
  lbpAdmin: [routes.lbpDashboard, routes.lbpCreate, routes.lbpEdit, routes.adminDetails],
  issuance: [
    routes.issuance,
    routes.issuanceCreate,
    routes.createVetting,
    routes.viewVetting,
    routes.createOffer,
    routes.editOffer,
    routes.reviewOffer,
    routes.issuanceReport,
    routes.manageOffer,
  ],
  securityTokens: [routes.securityToken(), routes.securityTokens()],
  payout: [
    routes.editPayoutEvent(),
    routes.payoutItemManager(),
    routes.payoutItem(),
    routes.createPayoutEvent,
    routes.manageTokens,
    routes.payoutHistory,
    routes.payoutEvent,
    routes.tokenManager('my-tokens', null),
    routes.tokenManager()
  ],
  defaults,
}

export function getActiveRoutes(pages: PagesConfig): string {
  // Filter out keys with true values
  const activeKeys = Object.keys(pages).filter((key: string) => pages[key as keyof PagesConfig])

  // Map keys to corresponding route arrays and flatten the result
  const activeRoutes = activeKeys.reduce((acc: string[], key: string) => {
    const routes = pagesGroup[key]
    if (routes) {
      acc.push(...routes)
    }
    return acc
  }, [])

  activeRoutes.push(...defaults)

  return JSON.stringify(activeRoutes)
}

function isSubset(largerArray: string[], smallerArray: string[]) {
  return smallerArray.every((element) => largerArray.includes(element))
}

export function checkExistInPageGroup(pagesSource: string) {
  const pages = {
    dex: false,
    kyc: false,
    lbp: false,
    lbpAdmin: false,
    offer: false,
    issuance: false,
    payout: false,
    securityTokens: false,
    admin: false,
  }

  const pagesArray = JSON.parse(pagesSource)

  if (isSubset(pagesArray, pagesGroup.dex)) {
    pages.dex = true
  }
  if (isSubset(pagesArray, pagesGroup.kyc)) {
    pages.kyc = true
  }
  if (isSubset(pagesArray, pagesGroup.lbp)) {
    pages.lbp = true
  }
  if (isSubset(pagesArray, pagesGroup.lbpAdmin)) {
    pages.lbpAdmin = true
  }
  if (isSubset(pagesArray, pagesGroup.offer)) {
    pages.offer = true
  }
  if (isSubset(pagesArray, pagesGroup.issuance)) {
    pages.issuance = true
  }
  if (isSubset(pagesArray, pagesGroup.payout)) {
    pages.payout = true
  }
  if (isSubset(pagesArray, pagesGroup.securityTokens)) {
    pages.securityTokens = true
  }
  if (isSubset(pagesArray, pagesGroup.admin)) {
    pages.admin = true
  }

  return pages
}
