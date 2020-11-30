import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { Commitments } from 'app/pages/authorizer/pages/commitments/Commitments'

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
