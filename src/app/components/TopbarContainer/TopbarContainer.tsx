import React from 'react'
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
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import { Grid } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { InvestRoute } from 'app/pages/invest/router/config'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import {
  OTCMarketLandingLinks,
  OTCMarketRoute
} from 'app/pages/exchange/router/config'
import { TopbarLinkContainer } from 'app/components/TopbarContainer/components/TopbarLinkContainer'
import { TopbarLinkDropdown } from 'app/components/TopbarContainer/components/TopbarLinkDropdown'
import { EducationCentreRoute } from 'app/pages/educationCentre/router/config'
import { AppRoute } from 'app/router/config'

export const TopbarContainer = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()
  const isFundManager = useIsFundManager()

  const isSuperUser = isAuthorizer || isAdmin
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
      link: IssuanceRoute.insight
    } as any)
  }

  if (isIssuer) {
    links.push({
      label: 'Issuance',
      link: IssuanceRoute.list,
      icon: IssuanceIcon
    })
  }

  links.push({
    label: 'Education Centre',
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
    { label: 'View Exchange Listings', path: OTCMarketRoute.myListings }
  ]

  if (isIssuer) {
    newIssuanceLandingLinks.push({
      label: 'Commitments',
      path: IssuanceRoute.commitments
    })

    newIssuanceLandingLinks.push({
      label: 'Cap Table',
      path: IssuanceRoute.capTable
    })
  }

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

  const { isTablet } = useAppBreakpoints()

  if (isTablet) {
    return null
  }

  return (
    <Grid style={{ display: 'flex' }}>
      {links.map(link => {
        if (
          link.label === 'Accounts' ||
          link.label === 'Authorizer' ||
          link.label === 'Invest' ||
          link.label === 'Issuance' ||
          link.label === 'Education Centre'
        ) {
          return (
            <TopbarLinkDropdown
              key={link.label}
              link={link.link}
              label={link.label}
              linkItems={dropdownLinksItems(link.label)}
            />
          )
        }
        return <TopbarLinkContainer {...link} key={link.label} />
      })}
    </Grid>
  )
}
