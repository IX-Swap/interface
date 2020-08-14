import { action, observable } from 'mobx'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import {
  CompletePasswordResetArgs,
  RequestPasswordResetArgs
} from 'v2/auth/service/types'
import authService from 'v2/auth/service'
import AsyncStore from 'v2/stores/async-store'

class PasswordResetStore extends AsyncStore {
  @observable
  email = '';

  @observable
  currentStep = PasswordResetStep.Request;

  @action
  setCurrentStep = (step: PasswordResetStep) => {
    this.currentStep = step
  };

  @action
  requestReset = async (args: RequestPasswordResetArgs) => {
    this.setBusy()
    const { success, message } = await authService.requestPasswordReset(args)

    if (success) {
      this.email = args.email
      this.currentStep = PasswordResetStep.Reset
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
    }
  };

  @action
  completeReset = async (args: CompletePasswordResetArgs) => {
    this.setBusy()
    const { success, message } = await authService.completePasswordReset(args)

    if (success) {
      this.currentStep = PasswordResetStep.Confirmation
      this.completeWithSuccess(message)
    } else {
      this.completeWithError(message)
    }
  };
}

export default PasswordResetStore
