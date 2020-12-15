import { InternalRouteProps } from 'types/util'
import { BanksList } from 'app/pages/accounts/pages/banks/BanksList/BanksList'
import BankPreview from 'app/pages/accounts/pages/banks/ViewBank/ViewBank'
import { CreateBank } from 'app/pages/accounts/pages/banks/CreateBank/CreateBank'
import { EditBank } from 'app/pages/accounts/pages/banks/EditBank/EditBank'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'

export const BanksRoute = {
  list: makeURL(['app', 'account', 'bankAccount']),
  view: makeURL(['app', 'account', 'bankAccount', 'bankId', 'view']),
  edit: makeURL(['app', 'account', 'bankAccount', 'bankId', 'edit']),
  create: makeURL(['app', 'account', 'bankAccount', 'create'])
}

export const banksRoutes: InternalRouteProps[] = [
  {
    label: 'List',
    path: BanksRoute.list,
    exact: true,
    component: BanksList
  },
  {
    label: 'View Bank',
    path: BanksRoute.view,
    component: BankPreview,
    exact: true
  },
  {
    label: 'Add Bank Account',
    path: BanksRoute.create,
    component: CreateBank,
    exact: true
  },
  {
    label: 'Edit Bank Account',
    path: BanksRoute.edit,
    component: EditBank,
    exact: true
  }
]

export const useBanksRouter = generateAppRouterHook<typeof BanksRoute>(
  BanksRoute,
  BanksRoute.list,
  banksRoutes
)
