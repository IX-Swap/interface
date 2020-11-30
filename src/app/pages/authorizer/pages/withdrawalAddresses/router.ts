import { generateAuthorizerCategoryRouter } from 'helpers/generateAuthorizerCategoryRouterHook'
import { WithdrawalAddresses } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddresses'

export const {
  router: useAuthorizerWithdrawalAddressesRouter,
  routes: authorizerWithdrawalAddressesRoutes,
  Route: AuthorizerWithdrawalAddressesRoute
} = generateAuthorizerCategoryRouter(
  'withdrawalAddresses',
  WithdrawalAddresses,
  'Withdrawal Address Details',
  'Withdrawal Addresses'
)

export const AuthorizerWithdrawalAddressesRouterRoot = () => {
  const { renderRoutes } = useAuthorizerWithdrawalAddressesRouter()
  return renderRoutes()
}
