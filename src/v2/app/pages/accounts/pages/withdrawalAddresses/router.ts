import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { makeURL } from 'v2/config/appURL'
import { WithdrawalAddressesList } from './WithdrawalAddressesList/WithdrawalAddressesList'

export const WithdrawalAddressesRoute = {
  list: makeURL(['app', 'account', 'withdrawalAddresses']),
  view: makeURL([
    'app',
    'account',
    'withdrawalAddresses',
    'withdrawalAddressId',
    'view'
  ]),
  create: makeURL(['app', 'account', 'withdrawalAddresses', 'create'])
}

export const withdrawalAddressesRoutes: InternalRouteProps[] = [
  {
    label: 'List',
    path: WithdrawalAddressesRoute.list,
    component: WithdrawalAddressesList,
    exact: true
  },
  {
    label: 'View Withdrawal Address',
    path: WithdrawalAddressesRoute.view,
    component: WithdrawalAddressesList,
    exact: true
  },
  {
    label: 'Add Withdrawal Addresses',
    path: WithdrawalAddressesRoute.create,
    component: WithdrawalAddressesList,
    exact: true
  }
]

export const useWithdrawalAddressesRouter = generateAppRouterHook<
  typeof WithdrawalAddressesRoute
>(
  WithdrawalAddressesRoute,
  WithdrawalAddressesRoute.list,
  withdrawalAddressesRoutes
)
