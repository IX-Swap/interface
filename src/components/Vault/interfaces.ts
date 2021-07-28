import { ActionHistoryStatus, ActionTypes } from './enum'

export interface ActionHistory {
  status: ActionHistoryStatus
  date: number
  type: ActionTypes
}

export interface TransactionHistory extends ActionHistory {
  sum: string
  sender?: string
  receiver: string
}
