import {
  BankFormValues,
  WithdrawCashFormValues,
  WithdrawDSFormValues
} from 'v2/app/accounts/types'
import { PaginationArgs } from 'v2/services/api/types'

export type CreateBankArgs = BankFormValues

export type UpdateBankArgs = BankFormValues & {
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
