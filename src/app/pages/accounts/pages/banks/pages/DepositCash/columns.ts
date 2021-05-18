import { CashDeposit } from 'types/cashDeposit'
import { TableColumn } from 'types/util'
import { getTimeAgoFromString } from 'helpers/dates'

export const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: getTimeAgoFromString
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    secret: true
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'status',
    label: 'Status'
  }
]
