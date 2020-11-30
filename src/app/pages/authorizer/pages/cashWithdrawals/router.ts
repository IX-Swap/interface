import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { CashWithdrawals } from 'app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'

export const {
  router: useAuthorizerCashWithdrawalsRouter,
  routes: authorizerCashWithdrawalsRoutes,
  Route: AuthorizerCashWithdrawalsRoute
} = generateAuthorizerCategoryRouter(
  'cashWithdrawal',
  CashWithdrawals,
  'Cash Withdrawal Details',
  'Cash Withdrawals'
)

export const AuthorizerCashWithdrawalsRouterRoot = () => {
  const { renderRoutes } = useAuthorizerCashWithdrawalsRouter()
  return renderRoutes()
}
