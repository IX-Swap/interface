export interface VirtualAccountTransactionFormValues {
  user: string
  accountId: string
  email: string
  amount: number
  type: 'Credit' | 'Debit'
  reference: string
}
