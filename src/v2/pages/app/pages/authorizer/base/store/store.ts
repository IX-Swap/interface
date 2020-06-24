import { action, observable } from 'mobx'
import { putRequest } from '../../../../../../helpers/httpRequests'
import { snackbarService } from 'uno-material-ui'
import { noop, get } from 'lodash'

export class AuthorizerTableStore {
  @observable source = ''
  @observable idKey = '_id'

  @action
  setIdKey = (key: string) => {
    this.idKey = key
  }

  @action
  setUri = (uri: string) => {
    this.source = uri
  }

  @action
  approve = async <T extends unknown>(item: T) => {
    const uri = this.source.replace(/\/list.*/, '')
    const response = await putRequest(`${uri}/${get(item, this.idKey)}/approve`, {})

    if (response.status !== 200) {
      snackbarService.showSnackbar('Cannot approve this item', 'error')
        .then(noop).catch(noop)
      return
    }

    snackbarService.showSnackbar('Approve Successful')
      .then(noop).catch(noop)
  }

  @action
  reject = async <T extends unknown>(item: T) => {
    const uri = this.source.replace(/\/list.*/, '')
    const response = await putRequest(`${uri}/${get(item, this.idKey)}/reject`, {})

    if (response.status !== 200) {
      snackbarService.showSnackbar('Cannot reject this item', 'error')
        .then(noop).catch(noop)
      return
    }

    snackbarService.showSnackbar('Reject Successful')
      .then(noop).catch(noop)
  }
}
