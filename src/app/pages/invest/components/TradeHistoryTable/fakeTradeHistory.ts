import { TradeHistory } from './TradeHistoryTable'

export const fakeTradeHistory: TradeHistory[] = [
  {
    date: '2021-05-19T03:51:57.502Z',
    pair: 'IXPS/SGD',
    name: 'InvestaX Preferred Stock',
    side: 'BUY',
    type: 'Limit',
    investedAmount: 15000,
    unitPrice: 15,
    totalAmount: 225000
  },
  {
    date: '2021-05-18T07:51:57.502Z',
    pair: 'JCC/USD',
    name: 'Jameson Capital Coin',
    side: 'SELL',
    type: 'Limit',
    investedAmount: 25000,
    unitPrice: 5,
    totalAmount: 125000
  }
]
