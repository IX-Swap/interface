import {
  useIsAdmin,
  useIsAuthorizer,
  useIsFundManager,
  useIsIssuer
} from 'helpers/acl'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { InvestRoute } from 'app/pages/invest/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { FundsManagementRoute } from 'app/pages/fundsManagement/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { AppRoute } from 'app/router/config'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'

export const useAppNavigationLinks = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()
  const isFundManager = useIsFundManager()

  const isSuperUser = isAuthorizer || isAdmin
  const educationCenterLabel = 'Education Centre'
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
      link: FundsManagementRoute.dashboard,
      icon: () => null
    })
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

  const educationCentreLinks = [
    {
      label: 'News',
      path: EducationCentreRoute.news
    },
    {
      label: 'Reports',
      path: EducationCentreRoute.reports
    },
    {
      label: 'Research Terminal',
      path: EducationCentreRoute.securitiesMarkets
    }
  ]

  const newInvestLandingLinks = [
    {
      label: 'Overview',
      path: InvestRoute.overview
    },
    {
      label: 'Primary',
      path: InvestRoute.landing
    },
    {
      label: 'Exchange',
      path: InvestRoute.exchange
    }
  ]

  const newIssuanceLandingLinks = [
    { label: 'Create New DSO', path: IssuanceRoute.create },
    { label: 'View DSO Listings', path: IssuanceRoute.list },
    { label: 'Create Exchange Listings', path: IssuanceRoute.createListing },
    { label: 'View Exchange Listings', path: IssuanceRoute.myListings },
    { label: 'Financial Reports', path: IssuanceRoute.financialReports }
  ]

  if (isFundManager) {
    newIssuanceLandingLinks.unshift({
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
        return newIssuanceLandingLinks
      case 'Invest':
        return newInvestLandingLinks
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

  return {
    links,
    dropdownLinksItems,
    isDropdownLink
  }
}
