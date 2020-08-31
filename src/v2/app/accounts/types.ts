import { Bank, Address } from 'v2/types/bank'
import { Asset } from 'v2/types/asset'

export type BankFormValues = Pick<
  Bank,
  | 'bankName'
  | 'accountHolderName'
  | 'bankAccountNumber'
  | 'swiftCode'
  | 'address'
> & {
  asset: Asset['_id']
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
