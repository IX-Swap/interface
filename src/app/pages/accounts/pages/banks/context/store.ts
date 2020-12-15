import { action, computed, observable } from 'mobx'

export enum DepositStoreStep {
  SETUP,
  PREVIEW,
  SUCCESS
}

export class DepositStore {
  @observable
  currentStep = DepositStoreStep.SETUP

  @computed
  get isSetup(): boolean {
    return this.currentStep === DepositStoreStep.SETUP
  }

  @computed
  get isPreview(): boolean {
    return this.currentStep === DepositStoreStep.PREVIEW
  }

  @computed
  get isSuccess(): boolean {
    return this.currentStep === DepositStoreStep.SUCCESS
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
