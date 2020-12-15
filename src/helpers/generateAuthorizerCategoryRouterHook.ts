import { makeURL, appURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ViewAuthorizableItem } from 'app/pages/authorizer/components/ViewAuthorizableItem'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'

export const generateAuthorizerCategoryRouter = (
  category: keyof typeof appURL,
  listComponent: InternalRouteProps['component'],
  viewLabel: string,
  listLabel: string
) => {
  const AuthorizerCategoryRoute = {
    list: makeURL(['app', 'authorizer', category]),
    view: makeURL(['app', 'authorizer', category, 'itemId', 'view'])
  }

  const routes: InternalRouteProps[] = [
    {
      label: viewLabel,
      path: AuthorizerCategoryRoute.view,
      component: ViewAuthorizableItem,
      exact: true
    },
    {
      label: listLabel,
      path: AuthorizerCategoryRoute.list,
      component: listComponent,
      exact: true
    }
  ]

  return {
    routes,
    Route: AuthorizerCategoryRoute,
    router: generateAppRouterHook(
      AuthorizerCategoryRoute,
      AuthorizerCategoryRoute.list,
      routes
    )
  }
}
