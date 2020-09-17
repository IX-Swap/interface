import { action, observable } from 'mobx'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

class PasswordResetStore {
  @observable
  email = ''

  @observable
  currentStep = PasswordResetStep.Request

  @action
  setCurrentStep = (step: PasswordResetStep) => {
    this.currentStep = step
  }

  @action
  setEmail = (email: string) => {
    this.email = email
  }
}

export default PasswordResetStore
