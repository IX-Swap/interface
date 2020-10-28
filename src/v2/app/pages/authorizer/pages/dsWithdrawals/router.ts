import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'

export const {
  router: useAuthorizerDSWithdrawalsRouter,
  routes: authorizerDSWithdrawalsRoutes,
  Route: AuthorizerDSWithdrawalsRoute
} = generateAuthorizerCategoryRouter(
  'dsWithdrawal',
  DSWithdrawals,
  'Digital Security Withdrawal Details',
  'Digital Security Withdrawals'
)

export const AuthorizerDSWithdrawalsRouterRoot = () => {
  const { renderRoutes } = useAuthorizerDSWithdrawalsRouter()
  return renderRoutes()
}
