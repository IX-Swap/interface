import apiService from 'services/api'
import { UpdateUserRoleArgs } from './types'
import { userURL } from 'config/apiURL'

export const adminService = {
  async setUserRole(args: UpdateUserRoleArgs) {
    const { userId, ...payload } = args
    const url = userURL.updateRoles(userId)
    return await apiService.patch(url, payload)
  }
}
