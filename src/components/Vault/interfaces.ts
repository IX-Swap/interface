export interface ActionHistory {
  name: string
  status: string
  date: number
}

export interface TransactionHistory extends ActionHistory {
  sum: string
  sender: string
  receiver: string
}
