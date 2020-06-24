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
