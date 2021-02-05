import { Onboarding } from 'app/pages/home/pages/Onboarding'
import { makeURL } from 'config/appURL'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { InternalRouteProps } from 'types/util'

export const HomeRoute = {
  landing: makeURL(['app', 'home'])
}

export const homeRoutes: InternalRouteProps[] = [
  {
    label: 'Home',
    path: HomeRoute.landing,
    component: Onboarding
  }
]

export const useHomeRouter = generateAppRouterHook(
  HomeRoute,
  HomeRoute.landing,
  homeRoutes
)
