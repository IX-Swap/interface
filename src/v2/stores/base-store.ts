import { observable } from 'mobx'
import { GenericStatus } from 'v2/types/status'

class BaseStore {
  @observable
  status = GenericStatus.Init
}

export default BaseStore
