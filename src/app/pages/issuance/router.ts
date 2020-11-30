import { InternalRouteProps } from 'types/util'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'

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
