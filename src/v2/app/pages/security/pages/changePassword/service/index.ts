import storageService from 'v2/services/storage'
import User from 'v2/types/user'
import apiService from 'v2/services/api'
import { ChangePasswordFormValues } from '../types'

export const changePasswordService = {
  async changePassword (args: ChangePasswordFormValues) {
    const userId = this._getUserId()
    const { confirmPassword, ...payload } = args
    const uri = `/auth/password/change/${userId}`

    return await apiService.post<any>(uri, payload)
  },

  _getUserId (): string {
    const user = storageService.get<User>('user')

    if (user === undefined) {
      throw new Error('No user found')
    }

    return user._id
  }
}
