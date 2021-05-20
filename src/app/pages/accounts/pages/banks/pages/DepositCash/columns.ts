import { CashDeposit } from 'types/cashDeposit'
import { TableColumn } from 'types/util'
import { getTimeAgoFromString } from 'helpers/dates'
import { renderAmount } from 'helpers/tables'

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
    key: 'virtualAccount.accountNumber',
    label: 'To'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    secret: true,
    render: renderAmount
  },
  {
    key: 'status',
    label: 'Status'
  }
]
