import React from 'react'
import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'helpers/acl'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import { HomeOutlined as HomeIcon } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { InvestRoute } from 'app/pages/invest/router/config'
import { HomeRoute } from 'app/pages/home/router/config'
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

export const TopbarContainer = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()

  const isSuperUser = isAuthorizer || isAdmin
  const links = [
    {
      label: 'Home',
      link: HomeRoute.landing,
      icon: HomeIcon
    },
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

  if (isIssuer) {
    links.push({
      label: 'Issuance',
      link: IssuanceRoute.insight,
      icon: IssuanceIcon
    })
  }

  if (isSuperUser) {
    links.push({
      label: 'Authorizer',
      link: AuthorizerRoute.landing,
      icon: AuthorizerIcon
    })
  }

  const newAccountsLandingLinks = [
    ...accountsLandingLinks,
    OTCMarketLandingLinks.reduce<any>((accum, item) => {
      return { ...item, label: 'My Exchange Holdings' }
    }, {})
  ]

  const newInvestLandingLinks = [
    {
      label: 'Primary',
      path: InvestRoute.landing
    },
    {
      label: 'Exchange',
      path: OTCMarketRoute.landing
    }
  ]

  const dropdownLinksItems = (name: string) => {
    switch (name) {
      case 'Authorizer':
        return authorizerLandingLinks
      case 'Accounts':
        return newAccountsLandingLinks
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
          link.label === 'Invest'
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
