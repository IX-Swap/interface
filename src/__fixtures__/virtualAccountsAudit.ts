import { VirtualAccountAuditItem } from 'types/virtualAccount'

export const virtualAccountsAuditItemSample: VirtualAccountAuditItem = {
  _id: '612048604a7d0e0a5054b8a3',
  fileName: 'NGVAMMT940.PC000004378.20210821002445002.TXT',
  createdAt: '2021-08-21T00:27:12.339Z'
}

export const virtualTransactionsItemSample: any = {
  _id: '612048604a7d0e0a5054b8a3',
  from: '123456789012 (HSBCSGS2)',
  to: '123456789012 (HSBCSGS2)',
  date: '2021-08-21T00:27:12.339Z',
  direction: 'VA to VA',
  typesOfTransfer: 'PP',
  amount: 'SGD 200,000.00'
}
