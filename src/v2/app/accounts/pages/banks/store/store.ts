import { action, observable } from 'mobx'
import { Bank } from 'v2/types/bank'

export class AccountsBanksModuleStore {
  @observable activeBank?: Bank
  @observable title = 'Viwe Bank'

  @action
  setActiveBank(bank: Bank) {
    this.activeBank = bank
  }

  @action
  setTitle(title: string) {
    this.title = title
  }
}
