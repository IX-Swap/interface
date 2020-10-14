import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { InvestLanding } from 'v2/app/pages/invest/pages/InvestLanding'
import { makeURL } from 'v2/config/urls'

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
