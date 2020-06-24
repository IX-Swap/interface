// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'
import useStyles from 'pages/exchange/styles'
import { withRouter, Route, Switch } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Paper
} from '@material-ui/core'
import BankComponent from '../bank'

const Overview = React.lazy(() => import('../overview/Overview'))
const Transactions = React.lazy(() => import('../transactions'))
const Wallets = React.lazy(() => import('../ditigal-securities'))

function useAccountsLogic () {
  const classes = useStyles()
  const theme = useTheme()

  return { classes, theme }
}

function AccountsPanel ({ location }: any) {
  const { classes } = useAccountsLogic()
  const routes = [
    {
      route: '/accounts',
      label: 'BALANCES',
      component: <Overview />
    },
    {
      route: '/accounts/banks',
      label: 'Bank',
      component: <BankComponent />
    },
    {
      route: '/accounts/wallets',
      label: 'DIGITAL SECURITIES',
      component: <Wallets />
    },
    {
      route: '/accounts/transactions',
      label: 'TRANSACTIONS',
      component: <Transactions />
    }
  ]

  let { pathname } = location
  const matched = (path: string): boolean =>
    routes.some((p) => p.route === path)

  // TODO: remove this hack, use proper routing
  while (!matched(pathname) && pathname !== '/') {
    pathname = pathname.split('/').filter(Boolean)
    pathname.pop()
    pathname = `/${pathname.join('/')}`
  }

  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Suspense fallback={<span>loading</span>}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={route.route}
                  exact={index === 0}
                  path={route.route}
                  render={() => route.component}
                />
              ))}
            </Switch>
          </Suspense>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withRouter(AccountsPanel)
