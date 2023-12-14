export interface VirtualAccountTransactionFormValues {
  user: string
  accountId: string
  email: string
  currency: 'SGD' | 'USD'
  amount: number
  type: 'Credit' | 'Debit'
  sendEmail: boolean
  reference: string
}