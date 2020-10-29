import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'

export const {
  router: useAuthorizerIndividualIdentitiesRouter,
  routes: authorizerIndividualIdentitiesRoutes,
  Route: AuthorizerIndividualIdentitiesRoute
} = generateAuthorizerCategoryRouter(
  'individualIdentity',
  IndividualIdentities,
  'Individual Identity Details',
  'Individual Identities'
)

export const AuthorizerIndividualIdentitiesRouterRoot = () => {
  const { renderRoutes } = useAuthorizerIndividualIdentitiesRouter()
  return renderRoutes()
}
