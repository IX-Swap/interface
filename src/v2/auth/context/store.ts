import { action, computed, observable } from 'mobx'
import User from '../../types/user'
import authService from 'v2/auth/service'
import { LoginArgs, SignupArgs, VerifySignupArgs } from '../service/types'
import AsyncStore from 'v2/stores/async-store'

export class UserStore extends AsyncStore {
  @observable
  user?: User = undefined;

  @observable
  activeTab = 0;

  @computed
  get isAuthenticated () {
    return Boolean(this.user)
  }

  @computed
  get isVerified () {
    return Boolean(this.user?.verified)
  }

  @action
  setActiveTab = (tab: number) => {
    this.activeTab = tab
  };

  @action
  login = async (args: LoginArgs) => {
    this.setBusy()
    this.user = undefined

    const { success, data, message } = await authService.login(args)

    if (success) {
      this.user = data
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
    }
  };

  @action
  signup = async (args: SignupArgs) => {
    this.setBusy()
    const { message, success } = await authService.signup(args)

    if (success) {
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
    }
  };

  @action
  logout = () => {
    this.user = undefined
    authService.logout()
  };

  @action
  verifySignup = async (args: VerifySignupArgs) => {
    this.setBusy()

    const { success, message } = await authService.verifySignup(args)

    if (success) {
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
    }
  };

  @action
  getUser = async () => {
    this.setBusy()
    this.user = undefined

    const { success, data, message } = await authService.getUser()

    if (success) {
      this.user = data
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
      this.logout()
    }
  };

  @action
  setUser = (user: User) => {
    this.user = user
  };
}
