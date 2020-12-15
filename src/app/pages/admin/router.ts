import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { makeURL } from 'config/appURL'
import { Users } from 'app/pages/admin/pages/Users'

export const AdminRoute = {
  users: makeURL(['app', 'admin'])
}

export const adminRoutes: InternalRouteProps[] = [
  {
    label: 'Users',
    path: AdminRoute.users,
    component: Users
  }
]

export const useAdminRouter = generateAppRouterHook(
  AdminRoute,
  AdminRoute.users,
  adminRoutes
)
