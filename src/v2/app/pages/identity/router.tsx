import { InternalRouteProps } from 'v2/types/util'
import { IdentitiesList } from 'v2/app/pages/identity/pages/IdentitiesList'
import { IndividualIdView } from 'v2/app/pages/identity/pages/individual/IndividualIdView'
import { CorporateIdentity } from 'v2/app/pages/identity/pages/corporate/CorporateIdentity'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { IndividualIdEdit } from 'v2/app/pages/identity/pages/individual/IndividualIdEdit'
import { IndividualIdCreate } from 'v2/app/pages/identity/pages/individual/IndividualIdCreate'

export const IdentityRoute = {
  list: '/app/identity/list',
  individual: '/app/identity/individual',
  createIndividual: '/app/identity/individual/create',
  individualEdit: '/app/identity/individual/edit',
  corporate: '/app/identity/corporate/:identityId'
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
    path: IdentityRoute.individualEdit,
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
    label: 'View Corporate',
    path: IdentityRoute.corporate,
    exact: true,
    component: CorporateIdentity
  }
]

export const useIdentitiesRouter = generateAppRouterHook<typeof IdentityRoute>(
  IdentityRoute,
  IdentityRoute.list,
  identityRoutes
)
