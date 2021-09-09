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
  FAILED = 'failed',
  REQUESTED = 'requested',
  CANCELLED = 'cancelled',
  PROCESSING = 'processing',
}
export enum ActionTypes {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}

export type ActionFilterTabs = ActionTypes | 'all'
export const filterTabs = [ActionTypes.DEPOSIT, ActionTypes.WITHDRAW, 'all']
export const ActionTypeTextHeader: { [key in ActionFilterTabs]: string } = {
  [ActionTypes.DEPOSIT]: t`Deposit`,
  [ActionTypes.WITHDRAW]: t`Withdraw`,
  ['all']: t`All`,
}

export const isPendingDeposit = (status: ActionHistoryStatus) => {
  return [ActionHistoryStatus.PENDING, ActionHistoryStatus.APPROVED].includes(status)
}
export const isSuccessTransaction = (action: ActionTypes, status: ActionHistoryStatus) => {
  if (action == ActionTypes.DEPOSIT) {
    return status === ActionHistoryStatus.SETTLED
  }
  return status === ActionHistoryStatus.APPROVED
}

export const ActionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`In progress...`,
  [ActionHistoryStatus.APPROVED]: t`Approved`,
  [ActionHistoryStatus.SETTLED]: t`Approved`,
  [ActionHistoryStatus.REJECTED]: t`Rejected`,
  [ActionHistoryStatus.FAILED]: t`Failed`,
  [ActionHistoryStatus.REQUESTED]: t`Requested`,
  [ActionHistoryStatus.CANCELLED]: t`Cancelled`,
  [ActionHistoryStatus.PROCESSING]: t`Processing`,
}

export const TransactionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`Pending...`,
  [ActionHistoryStatus.APPROVED]: t`Completed`,
  [ActionHistoryStatus.SETTLED]: t`Completed`,
  [ActionHistoryStatus.REJECTED]: t`Declined`,
  [ActionHistoryStatus.FAILED]: t`Failed`,
  [ActionHistoryStatus.REQUESTED]: t`Requested`,
  [ActionHistoryStatus.CANCELLED]: t`Cancelled`,
  [ActionHistoryStatus.PROCESSING]: t`Processing`,
}

export const StatusColors = {
  [ActionHistoryStatus.PENDING]: 'text2',
  [ActionHistoryStatus.APPROVED]: 'green1',
  [ActionHistoryStatus.SETTLED]: 'green1',
  [ActionHistoryStatus.REJECTED]: 'error',
  [ActionHistoryStatus.FAILED]: 'error',
  [ActionHistoryStatus.REQUESTED]: t`text2`,
  [ActionHistoryStatus.CANCELLED]: t`error`,
  [ActionHistoryStatus.PROCESSING]: t`text2`,
}

export const ActionTypeText = {
  [ActionTypes.DEPOSIT]: t`Deposit`,
  [ActionTypes.WITHDRAW]: t`Withdraw`,
}

export const getStatusColor = (action: ActionTypes, status: ActionHistoryStatus) => {
  if (action === ActionTypes.DEPOSIT && status === ActionHistoryStatus.APPROVED) {
    return StatusColors[ActionHistoryStatus.PENDING]
  }
  return StatusColors[status]
}
export const getActionStatusText = (action: ActionTypes, status: ActionHistoryStatus) => {
  if (action === ActionTypes.DEPOSIT && status === ActionHistoryStatus.APPROVED) {
    return TransactionHistoryStatusText[ActionHistoryStatus.PENDING]
  }

  return TransactionHistoryStatusText[status]
}

export enum AccreditationStatusEnum {
  PENDING = 'new',
  APPROVED = 'approved',
  REJECTED = 'declined',
}
export interface IAccreditationRequest {
  message?: string
  status: AccreditationStatusEnum
}
