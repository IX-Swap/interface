import { TableColumn } from 'v2/types/util'
import { DSWithdrawal } from 'v2/types/ds-withdrawal'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import {
  renderAmount,
  renderAssetName,
  renderLastName
} from 'v2/helpers/tables'

export const columns: Array<TableColumn<DSWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'individual.firstName',
    label: 'Name',
    render: renderLastName
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'asset',
    label: 'Digital Security',
    render: renderAssetName
  },
  {
    key: 'recipientWallet',
    label: 'Wallet'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  }
]
