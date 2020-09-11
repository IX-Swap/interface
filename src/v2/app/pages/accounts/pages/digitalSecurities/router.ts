import { InternalRouteProps } from 'v2/types/util'
import { DSList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { DSDeposit } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSWithdraw } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { DSView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSView/DSView'

export const DSRoute = {
  list: '/app/accounts/digital-securities',
  view: '/app/accounts/digital-securities/:balanceId/view',
  deposit: '/app/accounts/digital-securities/:balanceId/deposit',
  withdraw: '/app/accounts/digital-securities/:balanceId/withdraw'
}

const dsRoutes: InternalRouteProps[] = [
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
