import { t } from '@lingui/macro'

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
export const filterTabs: ActionFilterTabs[] = [ActionTypes.DEPOSIT, ActionTypes.WITHDRAW, 'all']
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

const TransactionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`Pending...`,
  [ActionHistoryStatus.APPROVED]: t`Completed`,
  [ActionHistoryStatus.SETTLED]: t`Completed`,
  [ActionHistoryStatus.REJECTED]: t`Declined`,
  [ActionHistoryStatus.FAILED]: t`Failed`,
  [ActionHistoryStatus.REQUESTED]: t`Requested`,
  [ActionHistoryStatus.CANCELLED]: t`Cancelled`,
  [ActionHistoryStatus.PROCESSING]: t`Processing`,
}

const StatusColors = {
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
  FAILED = 'failed', // error occured
  PENDING_CUSTODIAN = 'pending-custodian', // waiting for custodian action
}
export interface AccreditationRequest {
  message?: string
  status: AccreditationStatusEnum
}
export const PENDING_ACCREDITATION_STATUSES = [
  AccreditationStatusEnum.PENDING,
  AccreditationStatusEnum.PENDING_CUSTODIAN,
]

export const ERROR_ACCREDITATION_STATUSES = [AccreditationStatusEnum.FAILED, AccreditationStatusEnum.REJECTED]
