import { AssetBalance } from 'v2/types/balance'
import { asset } from './authorizer'

export const balance: AssetBalance = {
  debitTotal: 123,
  creditTotal: 123,
  balance: 123,
  lastTransaction: 'some-string',
  assetId: asset._id,
  name: 'XXX',
  symbol: 'ø',
  type: 'Security',
  onHold: 1,
  available: 1,
  numberFormat: asset.numberFormat
}
