import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'

export const {
  router: useAuthorizerCommitmentsRouter,
  routes: authorizerCommitmentsRoutes,
  Route: AuthorizerCommitmentsRoute
} = generateAuthorizerCategoryRouter(
  'commitments',
  Commitments,
  'Commitment Details',
  'Commitments'
)

export const AuthorizerCommitmentsRouterRoot = () => {
  const { renderRoutes } = useAuthorizerCommitmentsRouter()
  return renderRoutes()
}
