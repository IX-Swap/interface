import { InternalRouteProps } from 'v2/types/util'
import { BanksList } from 'v2/app/pages/accounts/pages/banks/BanksList/BanksList'
import BankPreview from 'v2/app/pages/accounts/pages/banks/ViewBank/ViewBank'
import { CreateBank } from 'v2/app/pages/accounts/pages/banks/CreateBank/CreateBank'
import { EditBank } from 'v2/app/pages/accounts/pages/banks/EditBank/EditBank'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

export const BanksRoute = {
  list: '/app/accounts/banks',
  view: '/app/accounts/banks/:bankId/view',
  edit: '/app/accounts/banks/:bankId/edit',
  create: '/app/accounts/banks/create'
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
