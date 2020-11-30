import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { CashDeposits } from 'app/pages/authorizer/pages/cashDeposits/CashDeposits'

export const {
  router: useAuthorizerCashDepositsRouter,
  routes: authorizerCashDepositsRoutes,
  Route: AuthorizerCashDepositsRoute
} = generateAuthorizerCategoryRouter(
  'cashDeposit',
  CashDeposits,
  'Cash Deposit Details',
  'Cash Deposits'
)

export const AuthorizerCashDepositsRouterRoot = () => {
  const { renderRoutes } = useAuthorizerCashDepositsRouter()
  return renderRoutes()
}
