import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
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
    label: 'Withdrawal Addresses',
    path: WithdrawalAddressesRoute.view,
    component: WithdrawalAddressesList,
    exact: true
  },
  {
    label: 'Withdrawal Addresses',
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
