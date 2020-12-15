import { InternalRouteProps } from 'types/util'
import { DSList } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSWithdraw } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { makeURL } from 'config/appURL'
import { DSPreview } from 'app/components/DSPreview/DSPreview'

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
    component: DSPreview,
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
