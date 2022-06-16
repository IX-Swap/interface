import { SecToken } from 'types/secToken'

export interface PayoutEvent {
  id: number
  title: string
  description: string
  userId: number
  type: string
  status: string
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
  attachments: any[]
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
