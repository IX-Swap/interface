import { OTCMarket } from './market'

export enum OTCOrderStatus {
  NEW = 'NEW',
  MATCH = 'MATCH', // the system matched it
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED', // after the authorizer confirmed the match
  PENDING = 'PENDING',
  SETTLED = 'SETTLED',
  COMPLETED = 'COMPLETED' //  complete status - tokens sent complete
}

export type OrderType = 'SELL' | 'BUY'
export interface OTCIdentity {
  individual?: OTCParticipant
  corporate?: OTCParticipant
}
export interface BaseOTCOrder {
  _id: string
  price: number
  amount: number
  ethAddress: string
  pair: OTCMarket
  orderType: OrderType
  availableAmount: number
  status: OTCOrderStatus
  createdAt: string
  user: string
  identity?: OTCIdentity
}
export interface OTCOrder extends BaseOTCOrder {
  matches?: OTCMatch
}

export interface OpenOTCOrder extends BaseOTCOrder {
  matches?: OTCMatch[]
}

export interface ColumnOTCMatch extends OTCMatch {
  pair: OTCMarket
  createdAt: string
  orderType: OrderType
  parentOrder: string
  parentAmount: number
}
export interface OTCMatch {
  _id: string
  order: string
  ethAddress: string
  matchedAmount: number
  matchedPrice: number
  status: OTCOrderStatus
  user: string
  identity?: OTCIdentity
  matchedOrder?: {
    _id: string
    amount: number
    availableAmount: number
  }
}

export interface OTCParticipant {
  _id: string
  firstName?: string
  lastName?: string
  middleName?: string
  companyLegalName?: string
  contactNumber?: string
}

export interface CreateOTCOrderArgs {
  orderType: 'SELL' | 'BUY'
  price: number
  amount: number
  ethAddress: string
  pair: string
}
