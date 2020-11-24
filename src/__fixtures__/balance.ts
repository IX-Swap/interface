import { AssetBalance } from 'v2/types/balance'
import { asset } from '__fixtures__/authorizer'

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
