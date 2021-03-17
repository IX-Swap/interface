import React from 'react'
import { NavigationWrapper } from 'ui/Navigation/NavigationWrapper'
import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'helpers/acl'
import { SidebarLinkContainer } from 'app/components/SidebarContainer/components/SidebarLinkContainer'
import { useAuthorizerRouter } from 'app/pages/authorizer/router'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import { HomeOutlined as HomeIcon } from '@material-ui/icons'
import { SwipeableDrawer } from '@material-ui/core'
import { useAppActions, useAppState } from 'app/hooks/useAppState'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useHomeRouter } from 'app/pages/home/router'

export const SidebarContainer = () => {
  const { isNavDrawerOpened } = useAppState()
  const { setNavDrawerOpened } = useAppActions()

  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()

  const { paths: authorizerRoutes } = useAuthorizerRouter()
  const { paths: homeRoutes } = useHomeRouter()

  const isSuperUser = isAuthorizer || isAdmin
  const links = [
    {
      label: 'Home',
      link: homeRoutes.landing,
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
      link: authorizerRoutes.landing,
      icon: AuthorizerIcon
    })
  }

  const { isTablet } = useAppBreakpoints()

  const sidebar = (
    <NavigationWrapper>
      {links.map(link => (
        <SidebarLinkContainer {...link} key={link.label} />
      ))}
    </NavigationWrapper>
  )

  return isTablet ? (
    <SwipeableDrawer
      onClose={() => setNavDrawerOpened(false)}
      onOpen={() => setNavDrawerOpened(true)}
      open={isNavDrawerOpened}
    >
      {sidebar}
    </SwipeableDrawer>
  ) : (
    sidebar
  )
}
