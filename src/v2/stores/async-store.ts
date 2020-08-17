import BaseStore from 'v2/stores/base-store'
import { action, computed, observable } from 'mobx'
import { GenericStatus } from 'v2/types/status'

class AsyncStore extends BaseStore {
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
  protected completeWithSuccess (message: string): void {
    this.status = GenericStatus.Idle
    this.message = message
    this.error = ''
  }

  @action
  protected completeWithError (error: string): void {
    this.status = GenericStatus.Idle
    this.error = error
    this.message = ''
  }
}

export default AsyncStore
