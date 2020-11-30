import { TableColumn } from 'types/util'
import { Bank } from 'types/bank'
import { formatDateToMMDDYY } from 'helpers/dates'

export const columns: Array<TableColumn<Bank>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: formatDateToMMDDYY
  },
  {
    key: 'accountHolderName',
    label: 'Name'
  },
  {
    key: 'bankName',
    label: 'Bank Name'
  },
  {
    key: 'currency.symbol',
    label: 'Currency'
  },
  {
    key: 'bankAccountNumber',
    label: 'Bank Account #'
  }
]
