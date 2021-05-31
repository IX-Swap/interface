export interface Order {
  _id: string
  type: 'LIMIT'
  side: 'ASK' | 'BID'
  price: number
  amount: number
  date: string
  pair: string
  total: number
  filled: number
  average: number
  status: 'Filled' | 'Open' | 'Canceled'
}
