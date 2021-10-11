import { Bank, Address } from 'types/bank'
import { Asset } from 'types/asset'
import { PaginationArgs } from 'services/api/types'

export type BankFormValues = Pick<
  Bank,
  'bankName' | 'accountHolderName' | 'bankAccountNumber' | 'swiftCode'
> & {
  asset: Asset['_id']
  address: Bank['address']
}

export type AddressValues = Address

export interface TransactionWithOTP {
  otp: string
}

export interface TransactionBase {
  amount: number
}

export interface DepositCashFormValues
  extends TransactionBase,
    TransactionWithOTP {
  asset: string
}

export interface WithdrawCashFormValues {
  amount?: number | null
  otp?: string | null
  bankAccountId?: string | null
  memo?: string
  virtualAccount: string
  paymentMethodName: string | null
}

export interface DepositDSFormValues {
  balanceId: string
}

export interface WithdrawDSFormValues
  extends TransactionBase,
    TransactionWithOTP {
  recipientWallet: string
  memo?: string
}

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

export interface GetWithdrawalAddressesArgs extends PaginationArgs {}
