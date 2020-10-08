import User from '../../types/user'
import apiService from '../../services/api'
import {
  CompletePasswordResetArgs,
  GetUserArgs,
  LoginArgs,
  RequestPasswordResetArgs,
  SignupArgs,
  VerifySignupArgs
} from './types'

const authService = {
  _baseURL: '/auth',

  _buildURL(path: string) {
    return `${this._baseURL}${path}`
  },

  async login(args: LoginArgs) {
    const url = this._buildURL('/sign-in')
    return await apiService.post<User>(url, args)
  },

  async signup(args: SignupArgs) {
    const url = this._buildURL('/registrations')
    return await apiService.post(url, args)
  },

  async verifySignup(args: VerifySignupArgs) {
    const url = this._buildURL('/registrations/confirm')
    return await apiService.post(url, args)
  },

  async getUser(args: GetUserArgs) {
    const url = this._buildURL(`/profiles/${args.userId}`)
    return await apiService.get<User>(url)
  },

  async requestPasswordReset(args: RequestPasswordResetArgs) {
    const url = this._buildURL('/password/reset/start')
    return await apiService.post(url, args)
  },

  async completePasswordReset(args: CompletePasswordResetArgs) {
    const url = this._buildURL('/password/reset/confirm')
    return await apiService.post(url, args)
  }
}

export default authService
