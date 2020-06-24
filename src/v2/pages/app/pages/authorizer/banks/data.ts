import { TableColumn } from '../../../../../types/util'
import { Bank } from '../../../../../types/bank'

import moment from 'moment'

const columns: Array<TableColumn<Bank>> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: (val: string) => moment(val).format('MM/DD/YY')
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

export default columns
