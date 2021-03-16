import { InternalRouteProps } from 'types/util'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'
import { DSOList } from './pages/DSOList'
import { PreviewDSO } from 'app/pages/issuance/pages/PreviewDSO'

export const IssuanceRoute = {
  list: makeURL(['app', 'issuance', 'offerings']),
  view: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'view']),
  preview: makeURL(['app', 'issuance', 'offerings', 'dsoId', 'preview']),
  insight: makeURL([
    'app',
    'issuance',
    'offerings',
    'issuerId',
    'dsoId',
    'overview'
  ]),
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
    label: 'Preview',
    path: IssuanceRoute.preview,
    exact: true,
    component: PreviewDSO
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
    label: 'Insight',
    path: IssuanceRoute.insight,
    component: IssuanceLanding,
    exact: true
  },
  {
    label: 'My DSOs',
    path: IssuanceRoute.list,
    exact: true,
    component: DSOList
  }
]

export const useIssuanceRouter = generateAppRouterHook(
  IssuanceRoute,
  IssuanceRoute.insight,
  issuanceRoutes
)
