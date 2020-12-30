import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'

export const DSORoute = {
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

export const dsoRoutes: InternalRouteProps[] = [
  {
    label: 'View DSO',
    path: DSORoute.view,
    exact: true,
    component: ViewDSO
  },
  {
    label: 'Invest',
    path: DSORoute.makeInvestment,
    exact: true,
    component: CommitmentFormWrapper
  }
]

export const useDSORouter = generateAppRouterHook(
  DSORoute,
  DSORoute.view,
  dsoRoutes
)
