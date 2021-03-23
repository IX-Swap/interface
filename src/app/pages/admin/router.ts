import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'

export const AdminRoute = {
  users: makeURL(['app', 'admin']),
  view: makeURL(['app', 'admin', 'users', 'userId', 'view']),
  accessReports: makeURL(['app', 'admin', 'accessReports']),
  createIndividualIdentity: '/app/admin/users/:userId/createIndividual'
}

export const adminRoutes: InternalRouteProps[] = [
  {
    label: 'Access Reports',
    path: AdminRoute.accessReports,
    component: AccessReports
  },
  {
    label: 'Users Roles',
    path: AdminRoute.users,
    component: Users,
    exact: true
  },
  {
    label: 'View User',
    path: AdminRoute.view,
    component: ViewUser
  },
  {
    label: 'Create Individual Identity',
    path: AdminRoute.createIndividualIdentity,
    component: CreateIndividualAsAdmin
  }
]

export const useAdminRouter = generateAppRouterHook(
  AdminRoute,
  AdminRoute.users,
  adminRoutes
)
