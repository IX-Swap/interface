export interface VirtualAccountTransactionFormValues {
  accountId: string
  email: string
  amount: string
  type: 'CREDIT' | 'DEBIT'
  reference: string
  notes?: string
}
