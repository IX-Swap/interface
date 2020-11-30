import { generateAuthorizerCategoryRouter } from 'v2/helpers/generateAuthorizerCategoryRouterHook'
import { WithdrawalAddresses } from 'v2/app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddresses'

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
