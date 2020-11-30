import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { DSWithdrawals } from 'app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'

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
