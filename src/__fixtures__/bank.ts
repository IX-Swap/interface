import {
  BankFormValues,
  DepositCashArgs,
  UpdateBankArgs,
  WithdrawCashArgs,
  WithdrawDSArgs
} from 'app/pages/accounts/types'
import { virtualAccount } from '__fixtures__/virtualAccount'
import { address, asset, bank } from './authorizer'

export const createBankArgs: BankFormValues = {
  bankName: 'ASBC',
  bankAccountNumber: '1234567890',
  accountHolderName: 'John Doe',
  swiftCode: 'SWIFTCODE',
  address: address,
  asset: asset._id
}

export const updateBankArgs: UpdateBankArgs = {
  bankId: '12',
  bankName: 'ASBC',
  bankAccountNumber: '1234567890',
  accountHolderName: 'John Doe',
  swiftCode: 'SWIFTCODE',
  address: address,
  asset: asset._id
}

export const depositCashArgs: DepositCashArgs = {
  asset: asset._id,
  amount: 123,
  depositCode: 'abc',
  otp: '123145',
  memo: '123'
}

export const withdrawCashArgs: WithdrawCashArgs = {
  amount: 123,
  otp: '123145',
  memo: '123',
  bankAccountId: bank._id,
  virtualAccount: virtualAccount.accountNumber,
  paymentMethodName: 'GIRO'
}

export const withdrawDSArgs: WithdrawDSArgs = {
  amount: 123,
  otp: '123145',
  memo: '123',
  asset: asset._id,
  recipientWallet: '123'
}
