import { InternalRouteProps } from 'v2/types/util'
import { InvestView } from 'v2/app/pages/invest/pages/InvestView'
import ViewCommitment from 'v2/app/pages/invest/pages/InvestCommitmentView'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { InvestList } from 'v2/app/pages/invest/pages/InvestList'
import { makeURL } from 'v2/config/urls'

export const InvestRoute = {
  list: makeURL(['app', 'invest']),
  offeringView: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'view'
  ]),
  commitmentView: makeURL([
    'app',
    'invest',
    'commitments',
    'commitmentId',
    'view'
  ])
}

export const investRoutes: InternalRouteProps[] = [
  {
    label: 'View Offering',
    path: InvestRoute.offeringView,
    exact: true,
    component: InvestView
  },
  {
    label: 'View Commitment',
    path: InvestRoute.commitmentView,
    exact: true,
    component: ViewCommitment
  },
  {
    label: 'Invest',
    path: InvestRoute.list,
    component: InvestList
  }
]

export const useInvestRouter = generateAppRouterHook(
  InvestRoute,
  InvestRoute.list,
  investRoutes
)
