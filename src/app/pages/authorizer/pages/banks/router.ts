import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'

export const {
  router: useAuthorizerBanksRouter,
  routes: authorizerBanksRoutes,
  Route: AuthorizerBanksRoute
} = generateAuthorizerCategoryRouter(
  'bankAccount',
  Banks,
  'Bank Account Details',
  'Bank Accounts'
)

export const AuthorizerBanksRouterRoot = () => {
  const { renderRoutes } = useAuthorizerBanksRouter()
  return renderRoutes()
}
