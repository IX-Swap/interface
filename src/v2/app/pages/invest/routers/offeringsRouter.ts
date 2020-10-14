import { makeURL } from 'v2/config/urls'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { OfferingsList } from 'v2/app/pages/invest/pages/OfferingsList'
import { CommitmentFormWrapper } from 'v2/app/pages/invest/components/CommitmentFormWrapper'
import { InvestOfferingView } from 'v2/app/pages/invest/pages/InvestOfferingView'

export const OfferingRoute = {
  list: makeURL(['app', 'invest', 'offerings']),
  view: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId', 'view']),
  makeInvestment: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'makeInvestment'
  ])
}

export const offeringsRoutes: InternalRouteProps[] = [
  {
    label: 'View Offering',
    path: OfferingRoute.view,
    exact: true,
    component: InvestOfferingView
  },
  {
    label: 'Invest',
    path: OfferingRoute.makeInvestment,
    exact: true,
    component: CommitmentFormWrapper
  },
  {
    label: 'Offerings',
    path: OfferingRoute.list,
    component: OfferingsList
  }
]

export const useOfferingsRouter = generateAppRouterHook(
  OfferingRoute,
  OfferingRoute.list,
  offeringsRoutes
)
