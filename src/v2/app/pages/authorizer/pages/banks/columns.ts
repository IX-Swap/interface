import { TableColumn } from 'v2/types/util'
import { Bank } from 'v2/types/bank'
import { convertStringToMMDDYY } from 'v2/helpers/dates'

export const columns: Array<TableColumn<Bank>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: convertStringToMMDDYY
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
    key: 'asset.symbol',
    label: 'Currency'
  },
  {
    key: 'bankAccountNumber',
    label: 'Bank Account #'
  }
]
