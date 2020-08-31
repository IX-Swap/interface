import BaseStore from 'v2/stores/base-store'
import { action, computed, observable } from 'mobx'
import { GenericStatus } from 'v2/types/status'
import { snackbarService } from 'uno-material-ui'

class AsyncStore extends BaseStore {
  _snackbarService = snackbarService

  @observable
  message = ''

  @observable
  error = ''

  @computed
  get isLoading (): boolean {
    return this.status === GenericStatus.Busy
  }

  @action
  protected setBusy (): void {
    this.status = GenericStatus.Busy
    this.error = ''
    this.message = ''
  }

  @action
  protected completeWithSuccess (
    message: string,
    showSnackbarMessage = false
  ): void {
    this.status = GenericStatus.Idle
    this.message = message
    this.error = ''

    if (showSnackbarMessage) {
      // eslint-disable-next-line no-void
      void this._snackbarService.showSnackbar(message, 'success')
    }
  }

  @action
  protected completeWithError (
    error: string,
    showSnackbarMessage = false
  ): void {
    this.status = GenericStatus.Idle
    this.error = error
    this.message = ''

    if (showSnackbarMessage) {
      // eslint-disable-next-line no-void
      void this._snackbarService.showSnackbar(error, 'error')
    }
  }
}

export default AsyncStore
