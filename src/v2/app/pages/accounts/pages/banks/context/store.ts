import { action, computed, observable } from 'mobx'

export enum DepositStoreStep {
  SETUP,
  PREVIEW
}

export class DepositStore {
  @observable
  currentStep = DepositStoreStep.SETUP

  @computed
  get isPreview(): boolean {
    return this.currentStep === DepositStoreStep.PREVIEW
  }

  @action
  setCurrentStep = (step: DepositStoreStep): void => {
    this.currentStep = step
  }

  @action
  clear = (): void => {
    this.currentStep = DepositStoreStep.SETUP
  }
}
