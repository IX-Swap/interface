import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { IdentitiesList } from 'app/pages/_identity/pages/IdentitiesList/IdentitiesList'
import { CreateIndividual } from 'app/pages/_identity/pages/CreateIndividual/CreateIndividual'
import { ViewIndividual } from 'app/pages/_identity/pages/ViewIndividual/ViewIndividual'
import { EditIndividual } from 'app/pages/_identity/pages/EditIndividual/EditIndividual'
import { CreateInvestor } from 'app/pages/_identity/pages/CreateInvestor/CreateInvestor'
import { ViewInvestor } from 'app/pages/_identity/pages/ViewInvestor/ViewInvestor'
import { EditInvestor } from 'app/pages/_identity/pages/EditInvestor/EditInvestor'
import { makeURL } from 'config/appURL'

export const IdentityRoute = {
  list: makeURL(['app', 'identity']),
  createIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'create'
  ]),
  individual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'identityId',
    'view'
  ]),
  editIndividual: makeURL([
    'app',
    'identity',
    'individualIdentity',
    'identityId',
    'edit'
  ]),
  createCorporate: makeURL(['app', 'identity', 'corporateIdentity', 'create']),
  corporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'identityId',
    'view'
  ]),
  editCorporate: makeURL([
    'app',
    'identity',
    'corporateIdentity',
    'identityId',
    'edit'
  ])
}

export const identityRoutes: InternalRouteProps[] = [
  {
    label: 'Identity',
    path: IdentityRoute.list,
    exact: true,
    component: IdentitiesList
  },
  {
    label: 'View Individual',
    path: IdentityRoute.individual,
    exact: true,
    component: ViewIndividual
  },
  {
    label: 'Edit Individual',
    path: IdentityRoute.editIndividual,
    exact: true,
    component: EditIndividual
  },
  {
    label: 'Create Individual Identity',
    path: IdentityRoute.createIndividual,
    exact: true,
    component: CreateIndividual
  },
  {
    label: 'Create Corporate Identity',
    path: IdentityRoute.createCorporate,
    exact: true,
    component: CreateInvestor
  },
  {
    
    label: 'View Corporate',
    path: IdentityRoute.corporate,
    exact: true,
    component: ViewInvestor
  },
  {
    label: 'Edit Corporate',
    path: IdentityRoute.editCorporate,
    exact: true,
    component: EditInvestor
  }
]

export const useIdentitiesRouter = generateAppRouterHook<typeof IdentityRoute>(
  IdentityRoute,
  IdentityRoute.list,
  identityRoutes
)
