import { action, observable } from 'mobx'
import { TwoFaData } from 'app/pages/security/pages/setup2fa/types'

export class Setup2faStore {
  public steps = [
    'Download app',
    'Scan QR Code',
    'Backup Key',
    'Enable Google Authenticator'
  ]

  @observable
  public activeStep = 0

  @observable
  public image = ''

  @observable
  public key = ''

  @observable
  public encoded = ''

  @action
  public setActiveStep = (step = 0): void => {
    this.activeStep = step
  }

  @action nextPage = (): void => {
    this.activeStep = Math.min(this.activeStep + 1, this.steps.length - 1)
  }

  @action prevPage = (): void => {
    this.activeStep = Math.max(this.activeStep - 1, 0)
  }

  @action
  set2faData = (data: TwoFaData) => {
    this.image = data.image
    this.key = data.key
    this.encoded = data.encoded
  }
}
