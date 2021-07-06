import { ActionHistoryStatus } from './enum'

export interface ActionHistory {
  name: string
  status: ActionHistoryStatus
  date: number
}

export interface TransactionHistory extends ActionHistory {
  sum: string
  sender?: string
  receiver: string
}
