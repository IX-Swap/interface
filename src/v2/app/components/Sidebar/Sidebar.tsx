import React from 'react'
import { List } from '@material-ui/core'
import { useIsAuthorizer, useIsIssuer } from 'v2/helpers/acl'
import { SidebarLink } from 'v2/app/components/Sidebar/components/SidebarLink'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { useInvestRouter } from 'v2/app/pages/invest/routers/router'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { useStyles } from './Sidebar.styles'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'

export const Sidebar = () => {
  const isAuthorizer = useIsAuthorizer()
  const isIssuer = useIsIssuer()
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
      link: investRoutes.list,
      icon: InvestIcon
    },
    ...(isIssuer
      ? [
          {
            label: 'Issuance',
            link: issuanceRoutes.list,
            icon: IssuanceIcon
          }
        ]
      : []),
    ...(isAuthorizer
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
