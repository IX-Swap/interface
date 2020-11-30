import {
  CreateBankArgs,
  DepositCashArgs,
  UpdateBankArgs,
  WithdrawCashArgs,
  WithdrawDSArgs
} from 'app/pages/accounts/types'
import { address, asset, bank } from './authorizer'

export const createBankArgs: CreateBankArgs = {
  bankName: 'ASBC',
  bankAccountNumber: '1234567890',
  accountHolderName: 'John Doe',
  swiftCode: 'SWIFTCODE',
  address: address,
  asset: asset._id,
  supportingDocuments: []
}

export const updateBankArgs: UpdateBankArgs = {
  bankId: '12',
  bankName: 'ASBC',
  bankAccountNumber: '1234567890',
  accountHolderName: 'John Doe',
  swiftCode: 'SWIFTCODE',
  address: address,
  asset: asset._id,
  supportingDocuments: []
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
  bank: bank._id
}

export const withdrawDSArgs: WithdrawDSArgs = {
  amount: 123,
  otp: '123145',
  memo: '123',
  asset: asset._id,
  recipientWallet: '123'
}
