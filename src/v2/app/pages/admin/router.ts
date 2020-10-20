import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { makeURL } from 'v2/config/urls'
import { Users } from 'v2/app/pages/admin/pages/Users'

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
