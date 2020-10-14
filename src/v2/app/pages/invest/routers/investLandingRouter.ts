import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { makeURL } from 'v2/config/urls'
import { CommitmentsRoot } from 'v2/app/pages/invest/pages/CommitmentsRoot'
import { OfferingsRoot } from 'v2/app/pages/invest/pages/OfferingsRoot'

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
