import { formatAmount } from 'helpers/numbers'
import { TableColumn } from 'types/util'

export const renderTotalAmount = (_: any, row: any) =>
  formatAmount(row.balance * row.lastPrice)

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
    key: 'balance',
    label: 'Invested Amount',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'lastPrice',
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
    render: renderTotalAmount
  }
]
