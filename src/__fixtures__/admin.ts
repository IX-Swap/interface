import { user } from './user'
import { UpdateUserRoleArgs } from 'v2/app/pages/admin/service/types'
import { appRoles } from 'v2/helpers/acl'

export const adminURLs = {
  setUserRole: `/auth/users/${user._id}/roles`
}

export const setUserRoleArgs: UpdateUserRoleArgs = {
  roles: [appRoles.ACCREDITED, appRoles.ADMIN].join(','),
  userId: user._id
}
