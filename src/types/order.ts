export enum OrderSide {
  ASK = 'ASK',
  BID = 'BID'
}
export interface Order {
  _id: string
  type: 'LIMIT'
  side: OrderSide
  price: number
  amount: number
  date: string
  pair: string
  total: number
  filled: number
  filledPercent?: number
  average: number
  status: 'FILLED' | 'OPEN' | 'CANCELLED'
}
