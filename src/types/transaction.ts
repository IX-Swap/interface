import NumberFormat from 'react-number-format'

export interface Transaction {
  _id: string
  deleted: boolean
  createdBy: string
  symbol: string
  name: string
  type: 'Currency' | 'Security'
  numberFormat: NumberFormat
  createdAt: string
  updatedAt: string
}

export interface VirtualTransaction {
  _id: string
  amount: number
  detail: {
    _id: string
    paymentMethod: string
    direction: string
    debtorAccountNumber: string
    debtorSwiftCode: string
    creditorAccountNumber: string
    creditorSwiftCode: string
    currency: string
  }
  createdAt: string
}
