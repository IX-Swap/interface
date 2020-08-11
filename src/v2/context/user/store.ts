import { action, observable } from 'mobx'

import { GENERIC_STATUS } from '../../types/status'
import User from '../../types/user'
import authService from 'v2/services/api/auth'
import storageHelper from '../../helpers/storageHelper'
import socketService from '../../services/socket'
import { LoginArgs, SignupArgs } from '../../services/api/auth/types'

export class UserStore {
  @observable
  user?: User = undefined

  @observable
  status: string = GENERIC_STATUS.INIT

  @observable
  isAuthenticated = false

  @observable
  isVerified = false

  @observable
  isLoading = false

  @observable
  activeTab = 0

  @observable
  message = ''

  @observable
  error = ''

  @action
  setUser = (mUser: User) => {
    this.user = mUser
  }

  @action
  setActiveTab = (tab: number) => {
    this.activeTab = tab
  }

  @action
  login = async (args: LoginArgs) => {
    this.isLoading = true
    this.error = ''

    const { data, message } = await authService.login(args)

    if (data) {
      this.user = data
      this.message = message
    } else {
      this.error = message
    }

    this.isLoading = false
  }

  @action
  signup = async (args: SignupArgs) => {
    this.isLoading = true
    this.error = ''

    const { data, message } = await authService.signup(args)

    if (data) {
      this.message = message
      this.activeTab = 2
    } else {
      this.error = message
    }

    this.isLoading = false
  }

  @action
  logout = () => {
    this.user = undefined

    storageHelper.remove()
    const socket = socketService.subscribeToSocket()

    if (socket) {
      socket.removeAllListeners()
      socket.disconnect()
    }

    // TODO: Fix to not hacky solution
    // @ts-ignore
    window.location = '#/auth/sign-in'
  }

  @action
  verifySignup = async (token: string) => {
    this.isLoading = true
    this.isVerified = false
    this.message = ''
    this.error = ''

    const response = await authService.verifySignup({ token })
    this.message = response.message

    if (response.data) {
      this.isVerified = true
    } else {
      this.error = response.data
    }

    this.isLoading = false
  }

  @action
  getUser = async () => {
    this.isLoading = true
    this.error = ''
    this.status = GENERIC_STATUS.GETTING
    this.user = undefined

    const response = await authService.getUser()
    this.status = GENERIC_STATUS.IDLE

    if (response.data) {
      this.user = response.data
    } else {
      this.error = response.message
      this.logout()
    }

    this.isLoading = false
  }

  hydrate = (mUser: User) => {
    this.user = mUser
  }
}
