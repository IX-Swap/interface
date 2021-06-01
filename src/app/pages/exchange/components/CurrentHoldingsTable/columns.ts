import { formatAmount } from 'helpers/numbers'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<any>> = [
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'name',
    label: 'Name'
  },

  {
    key: 'investedAmount',
    label: 'Invested Amount',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'unitPrice',
    label: 'Unit Price',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'totalAmount',
    label: 'Total Amount',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  }
]
