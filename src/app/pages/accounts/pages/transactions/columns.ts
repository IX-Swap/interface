import { TableColumn } from 'types/util'
import { Transaction } from 'types/transaction'
import { formatAmount } from 'helpers/numbers'
import { formatDateToMMDDYY } from 'helpers/dates'

const columns: Array<TableColumn<Transaction>> = [
  {
    label: 'Transaction ID',
    key: 'transactionId'
  },
  {
    label: 'Date',
    key: 'date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Type',
    key: 'type'
  },
  {
    label: 'Reference',
    key: 'reference'
  },
  {
    label: 'Debit',
    key: 'debit',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    label: 'Credit',
    key: 'credit',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  }
]

export default columns
