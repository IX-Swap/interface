import socketService from '../../services/socket'
import User from '../../types/user'
import apiService from '../../services/api'
import {
  CompletePasswordResetArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs,
  VerifySignupArgs
} from './types'
import storageService from '../../services/storage'
import { history } from 'v2/history'

const authService = {
  _baseURL: '/auth',

  _buildURL (path: string) {
    return `${this._baseURL}${path}`
  },

  async login (args: LoginArgs) {
    const url = this._buildURL('/sign-in')
    const response = await apiService.post<User>(url, args)

    if (response.success) {
      storageService.set('user', response.data)
      storageService.set('visitedUrl', [])
    }

    return response
  },

  async signup (args: SignupArgs) {
    const url = this._buildURL('/registrations')
    return await apiService.post(url, args)
  },

  logout () {
    storageService.remove('user')
    storageService.remove('visitedUrl')
    socketService.disconnect()
    history.replace('/auth/login')
  },

  async verifySignup (args: VerifySignupArgs) {
    const url = this._buildURL('/registrations/confirm')
    return await apiService.post(url, args)
  },

  async getUser () {
    const user = storageService.get<User>('user')
    const userId = user !== undefined ? user._id : ''
    const url = this._buildURL(`/profiles/${userId}`)
    const response = await apiService.get<User>(url)

    if (response.success) {
      await socketService._subscribeToSocket()
    }

    return response
  },

  async requestPasswordReset (args: RequestPasswordResetArgs) {
    const url = this._buildURL('/password/reset/start')
    return await apiService.post(url, args)
  },

  async completePasswordReset (args: CompletePasswordResetArgs) {
    const url = this._buildURL('/password/reset/confirm')
    return await apiService.post(url, args)
  }
}

export default authService
