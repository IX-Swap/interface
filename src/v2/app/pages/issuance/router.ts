import { InternalRouteProps } from 'v2/types/util'
import { DSOList } from 'v2/app/pages/issuance/pages/DSOList'
import { ViewDSO } from 'v2/app/pages/issuance/pages/ViewDSO'
import { CreateDSO } from 'v2/app/pages/issuance/pages/CreateDSO'
import { EditDSO } from 'v2/app/pages/issuance/pages/EditDSO'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

export const IssuanceRoute = {
  list: '/app/issuance',
  view: '/app/issuance/:dsoId',
  edit: '/app/issuance/:dsoId/edit',
  create: '/app/issuance/create'
}

export const issuanceRoutes: InternalRouteProps[] = [
  {
    label: 'Create Digital Security Offering',
    path: IssuanceRoute.create,
    component: CreateDSO,
    exact: true
  },
  {
    label: 'View',
    path: IssuanceRoute.view,
    exact: true,
    component: ViewDSO
  },
  {
    label: 'Edit',
    path: IssuanceRoute.edit,
    exact: true,
    component: EditDSO
  },
  {
    label: 'Issuance',
    path: IssuanceRoute.list,
    exact: true,
    component: DSOList
  }
]

export const useIssuanceRouter = generateAppRouterHook(
  IssuanceRoute,
  IssuanceRoute.list,
  issuanceRoutes
)
