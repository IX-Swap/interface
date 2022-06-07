import {
  useIsAccredited,
  useIsAdmin,
  useIsAuthorizer,
  useIsFundManager,
  useIsIssuer
} from 'helpers/acl'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import { AppRoute as AppPath, AppRoute } from 'app/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { FundsManagementRoute } from 'app/pages/fundsManagement/router/config'
import { educationCentreLinks } from 'app/pages/educationCentre/router/config'
import { investLandingLinks, InvestRoute } from 'app/pages/invest/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import { InternalRouteProps } from 'types/util'

export const useAppNavigation = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()
  const isAccredited = useIsAccredited()
  const isFundManager = useIsFundManager()
  const isSuperUser = isAuthorizer || isAdmin
  const educationCenterLabel = 'Education Centre'
  const issuanceLandingLinks: InternalRouteProps[] = [
    { label: 'Create New DSO', path: IssuanceRoute.create },
    { label: 'View DSO Listings', path: IssuanceRoute.list },
    { label: 'Create Exchange Listings', path: IssuanceRoute.createListing },
    { label: 'View Exchange Listings', path: IssuanceRoute.myListings },
    { label: 'Financial Reports', path: IssuanceRoute.financialReports }
  ]

  const links = [
    {
      label: 'Accounts',
      link: AccountsRoute.landing,
      icon: AccountsIcon
    },
    {
      label: 'Invest',
      link: InvestRoute.landing,
      icon: InvestIcon
    }
  ]

  if (isFundManager) {
    links.push({
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard
    } as any)
  }

  if (isIssuer) {
    links.push({
      label: 'Issuance',
      link: IssuanceRoute.dashboard,
      icon: IssuanceIcon
    })
  }

  links.push({
    label: educationCenterLabel,
    link: AppRoute.educationCentre
  } as any)

  if (isSuperUser) {
    links.push({
      label: 'Authorizer',
      link: AuthorizerRoute.landing,
      icon: AuthorizerIcon
    })
  }

  if (isFundManager) {
    issuanceLandingLinks.unshift({
      label: 'Overview',
      path: IssuanceRoute.insight
    })
  }

  const dropdownLinksItems = (name: string) => {
    switch (name) {
      case educationCenterLabel:
        return educationCentreLinks
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
      label === 'Issuance' ||
      label === educationCenterLabel
    ) {
      return true
    }
    return false
  }

  const isNavigationImpossibleWithoutCompletedIdentity = (link: string) => {
    return (
      !isAccredited &&
      !link.startsWith(AppPath.educationCentre) &&
      !link.startsWith(AppPath.identity) &&
      !link.startsWith(AppPath.security) &&
      !link.startsWith(AppPath.notifications)
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
