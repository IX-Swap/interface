import { TableColumn } from 'v2/types/util'
import { Transaction } from 'v2/types/transaction'
import { formatDateToMMDDYY } from 'v2/helpers/dates'

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
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'Credit',
    key: 'credit',
    headAlign: 'right',
    align: 'right',
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'Balance',
    key: 'runningTotal',
    headAlign: 'right',
    align: 'right',
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
]

export default columns
