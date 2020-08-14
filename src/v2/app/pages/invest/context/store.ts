import { action, observable } from 'mobx'
import { Dso } from '../../../../types/dso'
import { Commitment } from '../../../../types/commitment'

export class InvestStore {
  @observable selectedDso?: Dso;
  @observable selectedCommitment?: Commitment;
  @observable isPreview = false;

  @action
  setActiveCommitment (commitment: Commitment) {
    this.selectedCommitment = commitment
  }

  @action
  setIsPreview (preview: boolean) {
    this.isPreview = preview
  }

  @action
  selectDso (dso: Dso) {
    this.selectedDso = dso
  }
}
