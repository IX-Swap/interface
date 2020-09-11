import { action, observable } from 'mobx'

export class UserStore {
  @observable
  activeTab = 0

  @action
  setActiveTab = (tab: number): void => {
    this.activeTab = tab
  }
}
