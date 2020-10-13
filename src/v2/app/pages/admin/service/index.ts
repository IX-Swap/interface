import apiService from 'v2/services/api'
import { UpdateUserRoleArgs } from './types'

export const adminService = {
  _baseURL: '/auth',

  _buildURL(path: string) {
    return `${this._baseURL}${path}`
  },

  async setUserRole(args: UpdateUserRoleArgs) {
    const { userId, ...payload } = args
    const url = this._buildURL(`/users/${userId}/roles`)
    return await apiService.patch(url, payload)
  }
}
