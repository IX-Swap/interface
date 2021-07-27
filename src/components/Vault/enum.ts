import { t } from '@lingui/macro'
import { STO_STATUS_APPROVED, STO_STATUS_CREATED } from 'components/SecurityCard/STOStatus'

export enum VaultState {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const getVaultState = (status: string) => {
  if (status === STO_STATUS_APPROVED) return VaultState.APPROVED
  if (status === STO_STATUS_CREATED) return VaultState.PENDING
  return VaultState.NOT_SUBMITTED
}

export enum ActionHistoryStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SETTLED = 'settled',
}
export enum ActionTypes {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  KYC = 'kyc',
  ACCREDITATION = 'accreditation',
}
export const filterTabs = [ActionTypes.WITHDRAW, ActionTypes.DEPOSIT, ActionTypes.ACCREDITATION]
export const ActionTypeTextHeader: { [key in ActionTypes]: string } = {
  [ActionTypes.DEPOSIT]: t`Deposit`,
  [ActionTypes.WITHDRAW]: t`Withdraw`,
  [ActionTypes.KYC]: t`KYC`,
  [ActionTypes.ACCREDITATION]: t`Accreditation`,
}
export const isAction = (action: ActionTypes) => {
  return [ActionTypes.KYC, ActionTypes.ACCREDITATION].includes(action)
}
export const isTransaction = (action: ActionTypes) => {
  return [ActionTypes.DEPOSIT, ActionTypes.WITHDRAW].includes(action)
}
export const ActionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`In progress...`,
  [ActionHistoryStatus.APPROVED]: t`In progress...`,
  [ActionHistoryStatus.SETTLED]: t`Approved`,
  [ActionHistoryStatus.REJECTED]: t`Rejected`,
}
export const TransactionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`Pending...`,
  [ActionHistoryStatus.APPROVED]: t`Pending...`,
  [ActionHistoryStatus.SETTLED]: t`Completed`,
  [ActionHistoryStatus.REJECTED]: t`Declined`,
}
export const StatusColors = {
  [ActionHistoryStatus.PENDING]: 'text2',
  [ActionHistoryStatus.APPROVED]: 'text2',
  [ActionHistoryStatus.SETTLED]: 'green1',
  [ActionHistoryStatus.REJECTED]: 'error',
}

export const ActionTypeText = {
  [ActionTypes.DEPOSIT]: t`Deposit`,
  [ActionTypes.WITHDRAW]: t`Withdraw`,
  [ActionTypes.KYC]: t`KYC`,
  [ActionTypes.ACCREDITATION]: t`Pass accreditation`,
}
