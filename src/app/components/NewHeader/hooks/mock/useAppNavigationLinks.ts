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
import {
  OTCMarketLandingLinks,
  OTCMarketRoute
} from 'app/pages/exchange/router/config'

export const useAppNavigationLinks = () => {
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
    },
    {
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard,
      icon: () => null
    },
    {
      label: 'Issuance',
      link: IssuanceRoute.dashboard,
      icon: IssuanceIcon
    },
    {
      label: 'Education Centre',
      link: AppRoute.educationCentre
    } as any,
    {
      label: 'Authorizer',
      link: AuthorizerRoute.landing,
      icon: AuthorizerIcon
    }
  ]

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

  const newAccountsLandingLinks = [
    ...accountsLandingLinks,
    { ...OTCMarketLandingLinks[1], label: 'My Exchange Holdings' }
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
      path: OTCMarketRoute.landing
    }
  ]

  const newIssuanceLandingLinks = [
    { label: 'Create New DSO', path: IssuanceRoute.create },
    { label: 'View DSO Listings', path: IssuanceRoute.list },
    { label: 'Create Exchange Listings', path: OTCMarketRoute.createListing },
    { label: 'View Exchange Listings', path: OTCMarketRoute.myListings },
    { label: 'Financial Reports', path: IssuanceRoute.financialReports }
  ]

  const dropdownLinksItems = (name: string) => {
    switch (name) {
      case 'Education Centre':
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
        return newAccountsLandingLinks
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
      label === 'Education Centre'
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
