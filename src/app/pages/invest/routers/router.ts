import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { makeURL } from 'config/appURL'

export const InvestRoute = {
  list: makeURL(['app', 'invest'])
}

export const investRoutes: InternalRouteProps[] = [
  {
    label: 'Invest',
    path: InvestRoute.list,
    component: InvestLanding
  }
]

export const useInvestRouter = generateAppRouterHook(
  InvestRoute,
  InvestRoute.list,
  investRoutes
)
