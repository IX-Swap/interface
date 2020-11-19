import { user } from '__fixtures__/user'
import { UpdateUserRoleArgs } from 'v2/app/pages/admin/service/types'
import { AppRole } from 'v2/helpers/acl'

export const adminURLs = {
  setUserRole: `/auth/users/${user._id}/roles`
}

export const setUserRoleArgs: UpdateUserRoleArgs = {
  roles: [AppRole.ACCREDITED, AppRole.ADMIN].join(','),
  userId: user._id
}
