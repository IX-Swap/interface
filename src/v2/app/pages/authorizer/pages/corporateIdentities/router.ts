import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'

export const {
  router: useAuthorizerCorporateIdentitiesRouter,
  routes: authorizerCorporateIdentitiesRoutes,
  Route: AuthorizerCorporateIdentitiesRoute
} = generateAuthorizerCategoryRouter(
  'corporateIdentity',
  CorporateIdentities,
  'Corporate Identity Details',
  'Corporate Identities'
)

export const AuthorizerCorporateIdentitiesRouterRoot = () => {
  const { renderRoutes } = useAuthorizerCorporateIdentitiesRouter()
  return renderRoutes()
}
