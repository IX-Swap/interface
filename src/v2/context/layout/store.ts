import { action, observable } from 'mobx'

export class LayoutStore {
  @observable isSidebarOpened = false

  @action
  toggleSidebar = () => {
    this.isSidebarOpened = !this.isSidebarOpened
  }

  @action
  setSidebarOpened = (status: boolean) => {
    this.isSidebarOpened = status
  }
}
