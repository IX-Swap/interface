import { action, observable } from 'mobx'
import { snackbarService, MessageType } from 'uno-material-ui'
import apiService from 'v2/services/api'

export class AuthorizerTableStore {
  @observable
  public uri = ''

  @observable
  public idKey = '_id'

  @action
  public setIdKey = (key = '_id'): void => {
    this.idKey = key
  }

  @action
  public setUri = (uri: string): void => {
    this.uri = uri
  }

  @action
  public approve = async <T extends unknown>(item: T): Promise<void> => {
    const uri = this.uri.replace(/\/list.*/, '')
    const id = this._getItemId(item)
    const { success, message } = await apiService.put(
      `${uri}/${id}/approve`,
      {}
    )
    const snackbarOptions: [string, MessageType?] = [message]

    if (!success) snackbarOptions.push('error')
    // eslint-disable-next-line no-void
    void snackbarService.showSnackbar(...snackbarOptions)
  }

  @action
  public reject = async <T extends unknown>(item: T): Promise<void> => {
    const uri = this.uri.replace(/\/list.*/, '')
    const id = this._getItemId(item)
    const { success, message } = await apiService.put(`${uri}/${id}/reject`, {})
    const snackbarOptions: [string, MessageType?] = [message]

    if (!success) snackbarOptions.push('error')
    // eslint-disable-next-line no-void
    void snackbarService.showSnackbar(...snackbarOptions)
  }

  _getItemId (item: any): string {
    if (this.idKey in item) {
      return item[this.idKey] as string
    }

    return ''
  }
}
