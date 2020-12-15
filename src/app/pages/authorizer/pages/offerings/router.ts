import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { Offerings } from 'app/pages/authorizer/pages/offerings/Offerings'

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
