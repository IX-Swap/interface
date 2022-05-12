export enum OTCOrderStatus {
  NEW = 'NEW',
  MATCH = 'MATCH', // the system matched it
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED' // after the authorizer confirmed the match
  // in transfer - when the user sent tokens on blockchain
  //  complete status - tokens sent complete
}

export interface OTCOrder {
  _id: string
  price: number
  amount: number
  ethAddress: string
  pair: string
  orderType: 'SELL' | 'BUY'
  status: OTCOrderStatus
  createdAt: string
}
