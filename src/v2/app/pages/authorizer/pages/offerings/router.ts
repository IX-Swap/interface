import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'

export const {
  router: useAuthorizerOfferingsRouter,
  routes: authorizerOfferingsRoutes,
  Route: AuthorizerOfferingsRoute
} = generateAuthorizerCategoryRouter(
  'offerings',
  Offerings,
  'Offering Details',
  'Offerings'
)

export const AuthorizerOfferingsRouterRoot = () => {
  const { renderRoutes } = useAuthorizerOfferingsRouter()
  return renderRoutes()
}
