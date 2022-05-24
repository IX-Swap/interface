import { Asset } from './asset'
import { OTCMarket } from './market'

export enum OTCOrderStatus {
  NEW = 'NEW',
  MATCH = 'MATCH', // the system matched it
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED', // after the authorizer confirmed the match
  IN_TRANSFER = 'IN_TRANSFER', // in transfer - when the user sent tokens on blockchain
  COMPLETED = 'COMPLETED' //  complete status - tokens sent complete
}

export type OrderType = 'SELL' | 'BUY'
export interface OTCOrder {
  _id: string
  price: number
  amount: number
  ethAddress: string
  pair: OTCMarket
  orderType: OrderType
  status: OTCOrderStatus
  createdAt: string
}

export interface OTCParticipant {
  userId: string
  identityId: string
  identityType: 'individual' | 'corporate'
  name: string // full name or company name
  phoneNumber: string
}

export interface MatchedOTCOrder {
  _id: string
  price: number
  amount: number
  pair: string
  status: OTCOrderStatus
  createdAt: string
  asset: Asset
  buyer: OTCParticipant
  seller: OTCParticipant
}
export interface UnmatchedOTCOrder {
  _id: string
  price: number
  amount: number
  pair: string
  asset: Asset
  user: OTCParticipant
  orderType: 'SELL' | 'BUY'
}
