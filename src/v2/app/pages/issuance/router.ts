import { InternalRouteProps } from 'v2/types/util'
import { DSOList } from 'v2/app/pages/issuance/pages/DSOList'
import { ViewDSO } from 'v2/app/pages/issuance/pages/ViewDSO'
import { CreateDSO } from 'v2/app/pages/issuance/pages/CreateDSO'
import { EditDSO } from 'v2/app/pages/issuance/pages/EditDSO'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { makeURL } from 'v2/config/appURL'
import { DeployToken } from 'v2/app/pages/issuance/pages/DeployToken'

export const IssuanceRoute = {
  list: makeURL(['app', 'issuance', 'offerings']),
  view: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'view']),
  deployToken: makeURL([
    'app',
    'issuance',
    'offerings',
    'dsoId',
    'deployments'
  ]),
  edit: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'edit']),
  create: makeURL(['app', 'issuance', 'offerings', 'create'])
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
    label: 'Deploy Token',
    path: IssuanceRoute.deployToken,
    exact: true,
    component: DeployToken
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
