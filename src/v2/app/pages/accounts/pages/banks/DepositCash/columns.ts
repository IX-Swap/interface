import { CashDeposit } from 'v2/types/cashdeposit'
import { TableColumn } from 'v2/types/util'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderAmount } from 'v2/helpers/tables'

export const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'level',

    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  },
  {
    key: 'status',
    label: ''
  }
]
