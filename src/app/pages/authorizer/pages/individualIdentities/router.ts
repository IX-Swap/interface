import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { IndividualIdentities } from 'app/pages/authorizer/pages/individualIdentities/IndividualIdentities'

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
