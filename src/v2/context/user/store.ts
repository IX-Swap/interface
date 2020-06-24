import { action, observable } from 'mobx'

import { GENERIC_STATUS } from '../../types/status'
import User from '../../types/user'
import { loginUser } from './service'
import storageHelper from '../../helpers/storageHelper'

export class UserStore {
  @observable
  user?: User = undefined

  @observable
  status: string = GENERIC_STATUS.INIT

  @observable
  isAuthenticated: boolean = false

  @observable
  isLoading: boolean = false

  @observable
  activeTab: number = 0

  @observable
  message: string = ''

  @observable
  error: string = ''

  @action
  setUser = (mUser: User) => {
    this.user = mUser
  }

  @action
  setActiveTab = (tab: number) => {
    this.activeTab = tab
  }

  @action
  login = async (username: string, password: string, otp: string) => {
    this.isLoading = true
    this.error = ''

    const user = await loginUser(username, password, otp)
    if (!user.status) {
      this.isLoading = false
      if (user.message) {
        this.error = user.message
      }

      return
    }

    this.user = user.data
    this.isLoading = false
  }

  @action
  signup = async (...payload: any) => {
    console.log(payload)
  }

  @action
  logout = () => {
    this.user = undefined
    storageHelper.remove()
  }

  hydrate = (mUser: User) => {
    this.user = mUser
  }
}
