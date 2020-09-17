import { InternalRouteProps } from 'v2/types/util'
import { IdentitiesList } from 'v2/app/pages/identity/pages/IdentitiesList'
import { IndividualIdView } from 'v2/app/pages/identity/pages/individual/IndividualIdView'
import { CorporateIdView } from 'v2/app/pages/identity/pages/corporate/CorporateIdView'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { IndividualIdEdit } from 'v2/app/pages/identity/pages/individual/IndividualIdEdit'
import { IndividualIdCreate } from 'v2/app/pages/identity/pages/individual/IndividualIdCreate'
import { CorporateIdCreate } from 'v2/app/pages/identity/pages/corporate/CorporateIdCreate'
import { CorporateIdEdit } from 'v2/app/pages/identity/pages/corporate/CorporateIdEdit'

export const IdentityRoute = {
  list: '/app/identity/list',
  individual: '/app/identity/individual',
  createIndividual: '/app/identity/individual/create',
  editIndividual: '/app/identity/individual/edit',
  createCorporate: '/app/identity/corporate/create',
  corporate: '/app/identity/corporate/:identityId',
  editCorporate: '/app/identity/corporate/:identityId/edit'
}

export const identityRoutes: InternalRouteProps[] = [
  {
    label: 'List',
    path: IdentityRoute.list,
    exact: true,
    component: IdentitiesList
  },
  {
    label: 'View Individual',
    path: IdentityRoute.individual,
    exact: true,
    component: IndividualIdView
  },
  {
    label: 'Edit Individual',
    path: IdentityRoute.editIndividual,
    exact: true,
    component: IndividualIdEdit
  },
  {
    label: 'Create Individual',
    path: IdentityRoute.createIndividual,
    exact: true,
    component: IndividualIdCreate
  },
  {
    label: 'Create Corporate',
    path: IdentityRoute.createCorporate,
    exact: true,
    component: CorporateIdCreate
  },
  {
    label: 'View Corporate',
    path: IdentityRoute.corporate,
    exact: true,
    component: CorporateIdView
  },
  {
    label: 'View Corporate',
    path: IdentityRoute.editCorporate,
    exact: true,
    component: CorporateIdEdit
  }
]

export const useIdentitiesRouter = generateAppRouterHook<typeof IdentityRoute>(
  IdentityRoute,
  IdentityRoute.list,
  identityRoutes
)
