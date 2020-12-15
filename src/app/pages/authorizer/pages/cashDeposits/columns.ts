import { TableColumn } from 'types/util'
import { CashDeposit } from 'types/cashDeposit'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderIndividualOrCompanyName } from 'helpers/tables'

export const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'identity.individual.firstName',
    label: 'Name',
    render: renderIndividualOrCompanyName
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
