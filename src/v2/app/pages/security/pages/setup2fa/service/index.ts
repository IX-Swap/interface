import storageService from 'v2/services/storage'
import User from 'v2/types/user'
import apiService from 'v2/services/api'
import { Enable2faFormValues, TwoFaData } from '../types'

export const setup2faService = {
  async setup2fa () {
    const userId = this._getUserId()
    const uri = `/auth/2fa/setup/${userId}`

    return await apiService.post<TwoFaData>(uri, {})
  },

  async enable2fa ({ otp }: Enable2faFormValues) {
    const userId = this._getUserId()
    const uri = `/auth/2fa/setup/${userId}/confirm/${otp}`

    return await apiService.post(uri, {})
  },

  _getUserId (): string {
    const user = storageService.get<User>('user')

    if (user === undefined) {
      throw new Error('No user found')
    }

    return user._id
  }
}
