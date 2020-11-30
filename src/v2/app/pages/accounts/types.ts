import { Bank, Address } from 'v2/types/bank'
import { Asset } from 'v2/types/asset'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { PaginationArgs } from 'v2/services/api/types'

export type BankFormValues = Pick<
  Bank,
  'bankName' | 'accountHolderName' | 'bankAccountNumber' | 'swiftCode'
> & {
  asset: Asset['_id']
  address: Bank['address']
  supportingDocuments: FormArray<DataroomFile>
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

export interface WithdrawCashFormValues
  extends TransactionBase,
    TransactionWithOTP {
  bank: string
  memo?: string
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

export interface GetWithdrawalAddressesArgs extends PaginationArgs {}
