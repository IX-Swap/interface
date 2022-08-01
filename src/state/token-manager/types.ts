import { BigNumber } from '@ethersproject/bignumber'

import { PAYOUT_STATUS } from 'constants/enums'
import { SecToken } from 'types/secToken'
import { Document } from 'state/admin/actions'

export interface PayoutEvent {
  id: number
  title: string
  description: string
  userId: number
  type: string
  otherType: string
  status: PAYOUT_STATUS
  secTokenId: number
  secTokenAmount: string
  recordDate: string
  payoutToken: string
  tokenAmount: string
  isPaid: boolean
  startDate: string
  endDate: string | null
  createdAt: string
  updatedAt: string | null
  deletedAt: null | null
  secToken: SecToken
  attachments: Array<Document>
  contractPayoutId?: string
}

export interface PayoutList {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  items: PayoutEvent[]
  nextPage: number
  prevPage: number
}

export interface PayoutHistory {
  id: number
  sum: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  payoutEventId: number
  userId: number
  payoutEvent: PayoutEvent
  txHash: string
  user: {
    id: number
    username: string
    role: string
    ethAddress: string
  }
}

export interface PayoutHistoryList {
  page: number
  offset: number
  totalItems: number
  totalPages: number
  itemCount: number
  items: PayoutHistory[]
  nextPage: number
  prevPage: number
}

export interface PayoutAuthorization {
  operator: string
  manager: string
  token: string
  payoutId: string
  payoutNonce: number
  fund: number
  startDate: Date
  endDate: Date
  v: string | BigNumber | number
  r: string
  s: string
}
