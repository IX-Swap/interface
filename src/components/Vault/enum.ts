import { t } from '@lingui/macro'

export enum WithdrawStatus {
  DRAFT = 'draft',
  FEE_ACCEPTED = 'feeAccepted',
  PENDING = 'pending',
  BURNED = 'burned',
  ON_WHITELIST = 'onWhitelist',
  WHITELISTED = 'whitelisted',
  FB_TX_SUBMITTED = 'fbTxSubmitted',
  FB_TX_PENDING_AML_SCREENING = 'fbTxPendingAmlScreening',
  FB_TX_PENDING_AUTHORIZATION = 'fbTxPendingAuthorization',
  FB_TX_REJECTED = 'fbTxRejected',
  FB_TX_QUEUED = 'fbTxQueued',
  FB_TX_PENDING_SIGNATURE = 'fbTxPendingSignature',
  FB_TX_PENDING3RD_PARTY_MANUAL_APPROVAL = 'fbTxPending3rdPartyManualApproval',
  FB_TX_PENDING3RD_PARTY = 'fbTxPending3rdParty',
  FB_TX_PENDING = 'fbTxPending',
  FB_TX_BROADCASTING = 'fbTxBroadcasting',
  FB_TX_CONFIRMING = 'fbTxConfirming',
  FB_TX_CONFIRMED = 'fbTxConfirmed',
  FB_TX_PARTIALLY_COMPLETED = 'fbTxPartiallyCompleted',
  FB_TX_COMPLETED = 'fbTxCompleted',
  FB_TX_CANCELLING = 'fbTxCancelling',
  FB_TX_CANCELLED = 'fbTxCancelled',
  FB_TX_BLOCKED = 'fbTxBlocked',
  FB_TX_TIMEOUT = 'fbTxTimeout',
  FB_TX_FAILED = 'fbTxFailed',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

export enum DepositStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  APPROVED = 'approved',
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  SETTLED = 'settled',
  NON_TRADABLE = 'non_tradable',
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

export const isSuccessTransaction = (action: ActionTypes, status: string) => {
  if (action == ActionTypes.DEPOSIT) {
    return status === DepositStatus.SETTLED
  }
  return status === WithdrawStatus.APPROVED
}

const WithdrawStatusText = {
  [WithdrawStatus.DRAFT]: 'Waiting for fee payment...',
  [WithdrawStatus.FEE_ACCEPTED]: 'Fee accepted, ready for withdrawal...',
  [WithdrawStatus.PENDING]: 'Waiting for w${originalSymbol} burning...',
  [WithdrawStatus.BURNED]: 'w${originalSymbol} Burned, checking whitelists... ',
  [WithdrawStatus.ON_WHITELIST]: 'Whitelisting your wallet...',
  [WithdrawStatus.WHITELISTED]: 'Wallet whitelisted, sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_SUBMITTED]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING_AML_SCREENING]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING_AUTHORIZATION]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_REJECTED]: 'Withdrawal rejected (contact support)',
  [WithdrawStatus.FB_TX_QUEUED]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING_SIGNATURE]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING3RD_PARTY_MANUAL_APPROVAL]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING3RD_PARTY]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_PENDING]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_BROADCASTING]: 'Sending ${originalSymbol}...',
  [WithdrawStatus.FB_TX_CONFIRMING]: 'Sending ${originalSymbol}, confirming on blockchain...',
  [WithdrawStatus.FB_TX_CONFIRMED]: 'Sending MSTO, txn confirmed..',
  [WithdrawStatus.FB_TX_PARTIALLY_COMPLETED]: 'Withdrawal Completed!',
  [WithdrawStatus.FB_TX_CANCELLING]: 'Cancelling...',
  [WithdrawStatus.FB_TX_CANCELLED]: 'Withdrawal canceled (contact support if needed)',
  [WithdrawStatus.CANCELLED]: 'Withdrawal canceled (contact support if needed)',
  [WithdrawStatus.FB_TX_BLOCKED]: 'Withdrawal blocked (contact support)',
  [WithdrawStatus.FB_TX_TIMEOUT]: 'Withdrawal timeout (contact support)',
  [WithdrawStatus.FB_TX_FAILED]: 'Withdrawal failed (contact support)',
  [WithdrawStatus.APPROVED]: 'Withdrawal Completed!',
} as Record<string, string>

const DepositStatusText = {
  [DepositStatus.PENDING]: 'Waiting for deposit...',
  [DepositStatus.CANCELLED]: 'Deposit cancelled due timeout',
  [DepositStatus.FAILED]: 'Deposit failed (contact support)',
  [DepositStatus.APPROVED]: 'Deposit received, minting w${originalSymbol}...',
  [DepositStatus.REQUESTED]: 'Requested',
  [DepositStatus.PROCESSING]: 'Processing',
  [DepositStatus.SETTLED]: 'Deposited and minted successfully!',
} as Record<string, string>

const WithdrawStatusColors = {
  [WithdrawStatus.APPROVED]: 'green1',
  [WithdrawStatus.FB_TX_PARTIALLY_COMPLETED]: 'green1',
  [WithdrawStatus.FB_TX_CANCELLED]: 'error',
  [WithdrawStatus.FB_TX_BLOCKED]: 'error',
  [WithdrawStatus.FB_TX_TIMEOUT]: 'error',
  [WithdrawStatus.FB_TX_FAILED]: 'error',
  [WithdrawStatus.CANCELLED]: 'error',
} as Record<string, string>

const DepositStatusColors = {
  [DepositStatus.SETTLED]: 'green1',
  [DepositStatus.FAILED]: 'error',
  [DepositStatus.CANCELLED]: 'error',
} as Record<string, string>

export const withdrawErrorStatuses = [
  WithdrawStatus.FB_TX_CANCELLED,
  WithdrawStatus.FB_TX_BLOCKED,
  WithdrawStatus.FB_TX_TIMEOUT,
  WithdrawStatus.FB_TX_FAILED,
  WithdrawStatus.CANCELLED,
] as string[]

export const withdrawSuccessStatuses = [WithdrawStatus.APPROVED, WithdrawStatus.FB_TX_PARTIALLY_COMPLETED] as string[]

export const depositErrorStatuses = [DepositStatus.FAILED, DepositStatus.CANCELLED] as string[]

export const depositSuccessStatuses = [DepositStatus.SETTLED] as string[]

export const endedStatuses = [
  ...withdrawErrorStatuses,
  ...withdrawSuccessStatuses,
  ...depositErrorStatuses,
  ...depositSuccessStatuses,
] as string[]

export const ActionTypeText = {
  [ActionTypes.DEPOSIT]: t`Deposit`,
  [ActionTypes.WITHDRAW]: t`Withdrawal`,
}

export const getStatusColor = (action: ActionTypes, status: string) => {
  const StatusColors = action === ActionTypes.DEPOSIT ? DepositStatusColors : WithdrawStatusColors

  return StatusColors[status] || 'yellow4'
}
export const getActionStatusText = (action: ActionTypes, status: string, originalSymbol = '') => {
  const StatusText = action === ActionTypes.DEPOSIT ? DepositStatusText : WithdrawStatusText

  return (StatusText[status] || status).replace('${originalSymbol}', originalSymbol)
}

export const isPending = (status: string) => {
  return !endedStatuses.includes(status)
}

export const isWithdraw = (action: ActionTypes) => {
  return action === ActionTypes.WITHDRAW
}
export const isDeposit = (action: ActionTypes) => {
  return action === ActionTypes.DEPOSIT
}
export enum AccreditationStatusEnum {
  PENDING = 'new',
  APPROVED = 'approved',
  REJECTED = 'declined',
  FAILED = 'failed', // error occured
  PENDING_CUSTODIAN = 'pending-custodian', // waiting for custodian action
  PENDING_KYC = 'pending-kyc',
}

export interface CustodianInfo {
  name: string
  description: string
  website: string
}

export interface AccreditationRequest {
  brokerDealerId: number
  custodianId: number
  message?: string
  id: number
  status: AccreditationStatusEnum
  custodian: CustodianInfo
}
export const PENDING_ACCREDITATION_STATUSES = [
  AccreditationStatusEnum.PENDING,
  AccreditationStatusEnum.PENDING_CUSTODIAN,
  AccreditationStatusEnum.PENDING_KYC,
]

export const ERROR_ACCREDITATION_STATUSES = [AccreditationStatusEnum.FAILED, AccreditationStatusEnum.REJECTED]

export enum KYCStatuses {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CHANGES_REQUESTED = 'changes-requested',
  NOT_SUBMITTED = 'not submitted',
}
