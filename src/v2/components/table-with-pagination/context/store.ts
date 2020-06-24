import { action, observable, runInAction } from 'mobx'
import { getItems as getItemsFromApi } from './service'
import { GENERIC_STATUS } from '../../../types/status'

export class TableWithPaginationStore<T> {
  @observable uri: string = ''
  @observable filter: {} = {}
  @observable items: T[] = []
  @observable page = 0
  @observable limit = 25
  @observable total?: number = undefined
  @observable error?: string = undefined
  @observable statusCode?: number = undefined
  @observable errorCode?: number = undefined
  @observable status = GENERIC_STATUS.INIT

  constructor (mUri: string, filter: {}) {
    this.uri = mUri
    this.filter = filter
  }

  @action
  async getItems (filter: {}, skip = 0, limit = 50) {
    this.status = GENERIC_STATUS.GETTING
    const resp = await getItemsFromApi<T>(this.uri, {}, skip, limit)
    runInAction(() => {
      this.filter = filter

      if (resp.status && resp.data) {
        this.items = resp.data.items
        this.page = resp.data.page - 1
        this.total = resp.data.total
      }
      this.status = GENERIC_STATUS.IDLE
    })
  }

  async setRowsPerPage (rows: number) {
    this.limit = rows
    await this.setPage(0)
  }

  async setPage (page: number) {
    await this.getItems(this.filter, this.limit * page, this.limit)
  }
}
