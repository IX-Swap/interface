import moment from 'moment'
import { TableColumn } from 'v2/types/util'
import { Transaction } from 'v2/types/transaction'
import { formatAmount } from 'v2/helpers/numbers'

const columns: Array<TableColumn<Transaction>> = [
  {
    label: 'Transaction ID',
    key: 'transactionId'
  },
  {
    label: 'Date',
    key: 'date',
    render: (value: string) => moment(value).format('MM/DD/YYYY')
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
  },
  {
    label: 'Balance',
    key: 'runningTotal',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  }
]

export default columns
