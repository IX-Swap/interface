import { AssetBalance } from 'v2/types/balance'

export const list = [
  {
    _id: '1',
    assetId: '5f49e0b852e217515518c428',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 3000,
    onHold: 100,
    available: 2900
  },
  {
    _id: '2',
    name: 'NewCoin',
    symbol: 'NEW',
    assetId: '5f49e0cf52e217515518c429',
    balance: 100000,
    onHold: 0,
    available: 100000
  }
] as AssetBalance[]
