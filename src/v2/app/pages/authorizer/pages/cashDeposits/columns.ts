import { TableColumn } from 'v2/types/util'
import { CashDeposit } from 'v2/types/cashdeposit'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderAmount, renderFirstName } from 'v2/helpers/tables'

export const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'individual.firstName',
    label: 'User',
    render: renderFirstName
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'depositCode',
    label: 'Deposit Code'
  },
  {
    key: 'amount',
    label: 'Amount',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  }
]
