import React from 'react'
import { List } from '@material-ui/core'
import { useIsAdmin, useIsAuthorizer, useIsIssuer } from 'helpers/acl'
import { SidebarLink } from 'app/components/Sidebar/components/SidebarLink'
import { useAuthorizerRouter } from 'app/pages/authorizer/router'
import { useAccountsRouter } from 'app/pages/accounts/router'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useStyles } from './Sidebar.styles'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'

export const Sidebar = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
  const isAdmin = useIsAdmin()
  const { paths: authorizerRoutes } = useAuthorizerRouter()
  const { paths: accountRoutes } = useAccountsRouter()
  const { paths: investRoutes } = useInvestRouter()
  const { paths: issuanceRoutes } = useIssuanceRouter()
  const styles = useStyles()

  const links = [
    {
      label: 'Accounts',
      link: accountRoutes.landing,
      icon: AccountsIcon
    },
    {
      label: 'Invest',
      link: investRoutes.landing,
      icon: InvestIcon
    },
    ...(isIssuer
      ? [
          {
            label: 'Issuance',
            link: issuanceRoutes.insight,
            icon: IssuanceIcon
          }
        ]
      : []),
    ...(isAuthorizer || isAdmin
      ? [
          {
            label: 'Authorizer',
            link: authorizerRoutes.landing,
            icon: AuthorizerIcon
          }
        ]
      : [])
  ]

  return (
    <List className={styles.container}>
      {links.map(link => (
        <SidebarLink {...link} key={link.label} />
      ))}
    </List>
  )
}
