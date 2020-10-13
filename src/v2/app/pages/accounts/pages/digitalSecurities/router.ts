import { InternalRouteProps } from 'v2/types/util'
import { DSList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { DSDeposit } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSWithdraw } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { DSView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSView/DSView'
import { makeURL } from 'v2/config/urls'

export const DSRoute = {
  list: makeURL(['app', 'account', 'digitalSecurity']),
  view: makeURL(['app', 'account', 'digitalSecurity', 'balanceId', 'view']),
  deposit: makeURL([
    'app',
    'account',
    'digitalSecurity',
    'balanceId',
    'deposit'
  ]),
  withdraw: makeURL([
    'app',
    'account',
    'digitalSecurity',
    'balanceId',
    'withdraw'
  ])
}

export const dsRoutes: InternalRouteProps[] = [
  {
    label: 'Digital Securities',
    path: DSRoute.list,
    component: DSList,
    exact: true
  },
  {
    label: 'View Digital Security',
    path: DSRoute.view,
    component: DSView,
    exact: true
  },
  {
    label: 'Deposit Digital Security',
    path: DSRoute.deposit,
    component: DSDeposit,
    exact: true
  },
  {
    label: 'Withdraw Digital Security',
    path: DSRoute.withdraw,
    component: DSWithdraw,
    exact: true
  }
]

export const useDSRouter = generateAppRouterHook<typeof DSRoute>(
  DSRoute,
  DSRoute.list,
  dsRoutes
)
