import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { CommitmentsRoot } from 'app/pages/invest/pages/CommitmentsRoot'
import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  view: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId', 'view']),
  makeInvestment: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'makeInvestment'
  ]),
  commitments: makeURL(['app', 'invest', 'commitments'])
}

export const investRoutes = [
  {
    label: 'Invest',
    path: InvestRoute.landing,
    component: InvestLanding,
    exact: true
  },
  {
    label: 'View DSO',
    path: InvestRoute.view,
    component: ViewDSO
  },
  {
    label: 'Invest',
    path: InvestRoute.makeInvestment,
    component: CommitmentFormWrapper
  },
  {
    label: 'My Commitments',
    path: InvestRoute.commitments,
    component: CommitmentsRoot
  }
]

export const useInvestRouter = generateAppRouterHook(
  InvestRoute,
  InvestRoute.landing,
  investRoutes
)
