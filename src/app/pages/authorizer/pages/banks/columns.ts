import { TableColumn } from 'types/util'
import { Bank } from 'types/bank'
import { formatDateToMMDDYY } from 'helpers/dates'

export const renderName = (name: string) => {
  if (!(name !== null && name !== undefined ? name : '')) {
    return name?.substring(0, 20)
  }
}

export const columns: Array<TableColumn<Bank>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: formatDateToMMDDYY
  },
  {
    key: 'accountHolderName',
    label: 'Name',
    render: renderName
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
