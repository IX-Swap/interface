const defaults = ['/send', '/faucet', '/staking', '/vesting', '/launchpad']

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
    '/admin',
    '/admin/:tab/:id?',
    '/admin/kyc',
    '/admin/kyc/:kycId',
    '/admin/accreditation',
    '/admin/users-list',
    '/admin/transactions',
    '/admin/security-catalog',
    '/tenant/create',
    '/tenant',
  ],
  dex: [
    '/swap',
    '/pool',
    '/find',
    '/swap/:outputCurrency',
    '/add/:currencyIdA?/:currencyIdB?',
    '/remove/:currencyIdA/:currencyIdB',
  ],
  kyc: ['/kyc', '/kyc/individual', '/kyc/individual/v2', '/kyc/corporate'],
  lbp: ['/lbp/:id'],
  offer: ['/offer/:id'],
  lbpAdmin: ['/lbp-admin', '/lbp-admin/create', '/lbp-admin/edit', '/lbp-admin/detail/:id'],
  issuance: [
    '/issuance',
    '/issuance/create',
    '/issuance/create/vetting',
    '/issuance/view/vetting',
    '/issuance/create/information',
    '/issuance/edit/information',
    '/issuance/review/information',
    '/issuance/extract/:issuanceId',
    '/issuance/manage/:issuanceId',
  ],
  securityTokens: ['/security-token/:currencyId'],
  payout: [
    '/payout/edit/:id?',
    '/payout/:payoutId/manager',
    '/payout/:payoutId',
    '/payout/create',
    '/token-manager/my-tokens',
    '/token-manager/payout-history',
    '/token-manager/payout-events',
  ],
  defaults: ['/send', '/faucet', '/staking', '/vesting', '/launchpad'],
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
