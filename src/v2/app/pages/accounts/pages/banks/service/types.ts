import {
  BankFormValues,
  WithdrawCashFormValues,
  WithdrawDSFormValues
} from 'v2/app/pages/accounts/types'
import { PaginationArgs } from 'v2/services/api/types'

export type BankArgs = Omit<BankFormValues, 'supportingDocuments'> & {
  supportingDocuments: string[]
}

export type CreateBankArgs = BankArgs

export type UpdateBankArgs = BankArgs & {
  bankId: string
}

export interface DepositCashArgs {
  depositCode: string
  asset: string
  amount: number
  otp: string
  memo?: string
}

export type WithdrawCashArgs = WithdrawCashFormValues

export type WithdrawDSArgs = WithdrawDSFormValues & { asset: string }

export interface GetBanksArgs extends PaginationArgs {}
