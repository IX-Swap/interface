import {
  VAAuditOutboundItem,
  VirtualAccountAuditItem
} from 'types/virtualAccount'

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
