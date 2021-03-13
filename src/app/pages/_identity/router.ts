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
import { CreateIssuer } from 'app/pages/_identity/pages/CreateIssuer/CreateIssuer'
import { EditIssuer } from 'app/pages/_identity/pages/EditIssuer/EditIssuer'
import { ViewIssuer } from 'app/pages/_identity/pages/ViewIssuer/ViewIssuer'

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
  ]),
  createIssuer: '/app/identity/corporates/create-issuer',
  viewIssuer: '/app/identity/corporates/:identityId/view-issuer',
  editIssuer: '/app/identity/corporates/:identityId/edit-issuer'
}

export const identityRoutes: InternalRouteProps[] = [
  {
    label: 'Identity',
    path: IdentityRoute.list,
    exact: true,
    component: IdentitiesList
  },
  {
    label: 'View Individual Investor Identity',
    path: IdentityRoute.individual,
    exact: true,
    component: ViewIndividual
  },
  {
    label: 'Edit Individual Investor Identity',
    path: IdentityRoute.editIndividual,
    exact: true,
    component: EditIndividual
  },
  {
    label: 'Create Individual Investor Identity',
    path: IdentityRoute.createIndividual,
    exact: true,
    component: CreateIndividual
  },
  {
    label: 'Create Corporate Investor Identity',
    path: IdentityRoute.createCorporate,
    exact: true,
    component: CreateInvestor
  },
  {
    label: 'View Corporate Investor Identity',
    path: IdentityRoute.corporate,
    exact: true,
    component: ViewInvestor
  },
  {
    label: 'Edit Corporate Investor Identity',
    path: IdentityRoute.editCorporate,
    exact: true,
    component: EditInvestor
  },
    {
    label: 'Create Issuer Identity',
    path: IdentityRoute.createIssuer,
    exact: true,
    component: CreateIssuer
  },
  {
    label: 'View Issuer Identity',
    path: IdentityRoute.viewIssuer,
    exact: true,
    component: ViewIssuer
  },
  {
    label: 'Edit Issuer Identity',
    path: IdentityRoute.editIssuer,
    exact: true,
    component: EditIssuer
  }
]

export const useIdentitiesRouter = generateAppRouterHook<typeof IdentityRoute>(
  IdentityRoute,
  IdentityRoute.list,
  identityRoutes
)
