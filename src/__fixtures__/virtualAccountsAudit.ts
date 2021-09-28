import {
  VAAuditOutboundItem,
  VirtualAccountAuditItem
} from 'types/virtualAccount'
import { VirtualTransaction } from 'types/transaction'

export const virtualAccountsAuditItemSample: VirtualAccountAuditItem = {
  _id: '612048604a7d0e0a5054b8a3',
  fileName: 'NGVAMMT940.PC000004378.20210821002445002.TXT',
  createdAt: '2021-08-21T00:27:12.339Z'
}

export const virtualAccountsAuditOutboundItemSample: VAAuditOutboundItem = {
  _id: '612048604a7d0e0a5054b8a3',
  vaFileName: 'Instruction File',
  ackFileName: 'Acknowledgment File',
  createdAt: '2021-08-21T00:27:12.339Z'
}

export const virtualTransactionsItemSample: VirtualTransaction = {
  _id: '6131fb5f98f1b52f87191deb',
  amount: 10000,
  detail: {
    _id: '6131fb5f98f1b52f87191dec',
    paymentMethod: 'PP',
    direction: 'VA2VA',
    debtorAccountNumber: '0000000001',
    debtorSwiftCode: 'HSBCVNVX',
    creditorAccountNumber: '0000000003',
    creditorSwiftCode: 'HSBCVNVX',
    currency: 'SGD'
  },
  createdAt: '2021-09-03T10:39:27.691Z'
}
