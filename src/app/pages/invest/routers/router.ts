import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { CommitmentsRoot } from 'app/pages/invest/pages/CommitmentsRoot'
import { DSORoot } from 'app/pages/invest/pages/DSORoot'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  dso: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId']),
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
    path: InvestRoute.dso,
    component: DSORoot
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
