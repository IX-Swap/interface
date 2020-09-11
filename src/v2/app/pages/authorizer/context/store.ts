import { action, observable } from 'mobx'

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

  _getItemId (item: any): string {
    if (this.idKey in item) {
      return item[this.idKey] as string
    }

    return ''
  }
}
