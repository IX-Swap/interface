import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import { VirtualAccount } from 'types/virtualAccount'

export const columns: Array<TableColumn<VirtualAccount>> = [
  {
    key: 'assignedAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'user.name',
    label: 'Name'
  },
  {
    key: 'currency',
    label: 'Currency'
  },
  {
    key: 'accountNumber',
    label: 'Virtual Account No.'
  }
]
