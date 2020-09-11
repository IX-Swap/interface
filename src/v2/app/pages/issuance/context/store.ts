import { action, observable } from 'mobx'
import { Dso } from 'v2/types/dso'

export class IssuanceStore {
  @observable selectedDso?: Dso

  @action
  selectDso (dso: Dso) {
    this.selectedDso = dso
  }
}
