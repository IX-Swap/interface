import { action, observable } from 'mobx'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { Maybe } from 'types/util'

class PasswordResetStore {
  @observable
  email = ''

  @observable
  currentStep = PasswordResetStep.Request

  @observable
  token: Maybe<string> = null

  @action
  setCurrentStep = (step: PasswordResetStep) => {
    this.currentStep = step
  }

  @action
  setEmail = (email: string) => {
    this.email = email
  }

  @action setToken = (token: string) => {
    this.token = token
    this.currentStep = PasswordResetStep.Reset
  }

  @action reset = () => {
    this.token = null
    this.email = ''
    this.currentStep = PasswordResetStep.Request
  }
}

export default PasswordResetStore
