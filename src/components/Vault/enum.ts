import { t } from '@lingui/macro'

export enum VaultState {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ActionHistoryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const ActionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`In progress...`,
  [ActionHistoryStatus.APPROVED]: t`Approved`,
  [ActionHistoryStatus.REJECTED]: t`Rejected`,
}
export const TransactionHistoryStatusText = {
  [ActionHistoryStatus.PENDING]: t`Pending...`,
  [ActionHistoryStatus.APPROVED]: t`Completed`,
  [ActionHistoryStatus.REJECTED]: t`Declined`,
}
export const StatusColors = {
  [ActionHistoryStatus.PENDING]: 'text2',
  [ActionHistoryStatus.APPROVED]: 'green1',
  [ActionHistoryStatus.REJECTED]: 'error',
}
