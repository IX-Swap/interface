import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { CommitmentsRoot } from 'app/pages/invest/pages/CommitmentsRoot'
import { OfferingsRoot } from 'app/pages/invest/pages/OfferingsRoot'

export const InvestListRoute = {
  offerings: makeURL(['app', 'invest', 'offerings']),
  commitments: makeURL(['app', 'invest', 'commitments'])
}

export const investListRoutes = [
  {
    label: 'Offerings',
    path: InvestListRoute.offerings,
    component: OfferingsRoot
  },
  {
    label: 'My Commitments',
    path: InvestListRoute.commitments,
    component: CommitmentsRoot
  }
]

export const useInvestListRouter = generateAppRouterHook(
  InvestListRoute,
  InvestListRoute.offerings,
  investListRoutes
)
