import { action, observable } from 'mobx'
import { DigitalSecurityOffering } from 'v2/types/dso'

export class IssuanceStore {
  @observable selectedDso?: DigitalSecurityOffering

  @action
  selectDso(dso: DigitalSecurityOffering) {
    this.selectedDso = dso
  }
}
