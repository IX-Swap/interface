import socketService from '../../socket'
import User from '../../../types/user'
import apiService from '../index'
import { LoginArgs, SignupArgs, VerifySignupArgs } from './types'
import storageService from '../../storage'

const authService = {
  _baseURL: '/auth',

  _buildURL (path: string) {
    return `${this._baseURL}${path}`
  },

  async login (args: LoginArgs) {
    const url = this._buildURL('/sign-in')
    const response = await apiService.post<User>(url, args)

    if (response.data) {
      storageService.set('user', response.data)
      storageService.set('visitedUrl', [])
    }

    return response
  },

  async signup (args: SignupArgs) {
    const url = this._buildURL('/registrations')
    return await apiService.post(url, args)
  },

  async verifySignup (args: VerifySignupArgs) {
    const url = this._buildURL('/registrations/confirm')
    return await apiService.post(url, args)
  },

  async getUser () {
    const user = storageService.get<User>('user')
    const userId = user ? user._id : ''
    const url = this._buildURL(`/profiles/${userId}`)
    const response = await apiService.get<User>(url)

    if (response.data) {
      await socketService._subscribeToSocket()
    } else {
      // signout
    }

    return response
  }
}

export default authService
