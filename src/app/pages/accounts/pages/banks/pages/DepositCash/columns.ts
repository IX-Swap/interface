import { CashDeposit } from 'types/cashDeposit'
import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount } from 'helpers/tables'
import { renderStatusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'

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
    secret: true,
    render: renderAmount
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]
