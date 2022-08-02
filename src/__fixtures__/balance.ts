import { AssetBalance, ConvertedAssetBalance } from 'types/balance'
import { asset } from '__fixtures__/authorizer'
import { user } from './user'

export const balance: AssetBalance = {
  debitTotal: 123,
  creditTotal: 123,
  balance: 123,
  lastTransaction: '01-01-2000',
  assetId: asset._id,
  name: 'XXX',
  symbol: 'ø',
  type: 'Security',
  onHold: 1,
  available: 99999,
  numberFormat: asset.numberFormat
}

export const cashBalance: ConvertedAssetBalance = {
  _id: '12345',
  status: 'Approved',
  accountNumber: '1234567',
  currency: 'SGD',
  user: user,
  balance: {
    available: 1,
    onHold: 3,
    outstanding: 5,
    usdValue: 3,
    sgdValue: 6
  }
}

export const cashBalanceSubmitted: ConvertedAssetBalance = {
  ...cashBalance,
  status: 'Submitted'
}
