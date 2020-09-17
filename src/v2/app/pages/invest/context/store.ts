import { action, observable } from 'mobx'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Commitment } from 'v2/types/commitment'

export class InvestStore {
  @observable selectedDso?: DigitalSecurityOffering
  @observable selectedCommitment?: Commitment
  @observable isPreview = false

  @action
  setActiveCommitment (commitment: Commitment) {
    this.selectedCommitment = commitment
  }

  @action
  setIsPreview (preview: boolean) {
    this.isPreview = preview
  }

  @action
  selectDso (dso: DigitalSecurityOffering) {
    this.selectedDso = dso
  }
}
