import {
  useIsAccredited,
  useIsRetail,
  useIsExpert,
  useIsInstitutional,
  useIsIssuer,
  useIsAuthorizer,
  useIsFundManager,
  useIsAdmin
} from 'helpers/acl'
import {
  accountsLandingLinks
  // AccountsRoute
} from 'app/pages/accounts/router/config'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import { AppRoute as AppPath } from 'app/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { FundsManagementRoute } from 'app/pages/fundsManagement/router/config'
import { investLandingLinks, InvestRoute } from 'app/pages/invest/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
// import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
// import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'

import { InternalRouteProps } from 'types/util'
import { PRIME_URL, WEBSITE_URL } from 'config'

export const useAppNavigation = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()
  const isAccredited = useIsAccredited()
  const isRetail = useIsRetail()
  const isExpert = useIsExpert()
  const isInstitutional = useIsInstitutional()
  const isFundManager = useIsFundManager()
  const isSuperUser = isAuthorizer || isAdmin
  const isInvestor = isAccredited || isRetail || isExpert || isInstitutional
  const issuanceLandingLinks: InternalRouteProps[] = [
    // { label: 'Create New STO', path: IssuanceRoute.createNew },
    { label: 'My Primary Listings', path: IssuanceRoute.list },
    // { label: 'Create Secondary Listing', path: IssuanceRoute.createListing },
    { label: 'My Secondary Listings', path: IssuanceRoute.secondaryListings }
    // { label: 'Financial Reports', path: IssuanceRoute.financialReports }
  ]

  interface NavigationMenuItem {
    label: string
    link: string
    icon?: any
    isExternalUrl?: boolean
  }

  const links: NavigationMenuItem[] = [
    // {
    //   label: 'Home',
    //   link: AppRoute.home
    // },
    // {
    //   label: 'Accounts',
    //   link: AccountsRoute.landing,
    //   icon: AccountsIcon
    // },
    {
      label: 'Invest',
      link: InvestRoute.primaryOfferings,
      icon: InvestIcon
    }
  ]

  if (isFundManager) {
    links.push({
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard
    } as any)
  }

  if (isIssuer || isSuperUser) {
    links.push({
      label: 'Issuance',
      link: IssuanceRoute.dashboard,
      icon: IssuanceIcon
    })
  }

  // if (isSuperUser) {
  //   links.push({
  //     label: 'Authorizer',
  //     link: AuthorizerRoute.landing,
  //     icon: AuthorizerIcon
  //   })
  // }

  // if (isFundManager || isSuperUser) {
  //   issuanceLandingLinks.unshift({
  //     label: 'Overview',
  //     path: IssuanceRoute.insight
  //   })
  // }

  if (window.location.protocol + '//' + window.location.host !== PRIME_URL) {
    links.push({
      label: 'Explore STOs',
      link: 'https://prime.investax.io',
      isExternalUrl: true
    })
  }

  links.push({
    label: 'Knowledge Center',
    link: `${WEBSITE_URL}/knowledge-center`,
    isExternalUrl: true
  })

  const dropdownLinksItems = (name: string) => {
    switch (name) {
      case 'Authorizer':
        return [
          {
            label: 'Dashboard',
            path: AuthorizerRoute.landing
          },
          ...authorizerLandingLinks
        ]
      case 'Accounts':
        return accountsLandingLinks
      case 'Issuance':
        return issuanceLandingLinks
      case 'Invest':
        return investLandingLinks
      default:
        return []
    }
  }

  const isDropdownLink = (label: string) => {
    if (
      label === 'Accounts' ||
      label === 'Authorizer' ||
      label === 'Invest' ||
      label === 'Issuance'
    ) {
      return true
    }
    return false
  }

  const isNavigationImpossibleWithoutCompletedIdentity = (link: string) => {
    return (
      !isInvestor &&
      !link.startsWith(AppPath.identity) &&
      !link.startsWith(AppPath.security) &&
      !link.startsWith(AppPath.notifications) &&
      !link.startsWith(AppPath.accounts) &&
      !link.startsWith(AppPath.dashboard)
    )
  }

  return {
    links,
    dropdownLinksItems,
    isDropdownLink,
    isNavigationImpossibleWithoutCompletedIdentity:
      isNavigationImpossibleWithoutCompletedIdentity
  }
}
