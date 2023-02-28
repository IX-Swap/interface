import { TableColumn } from 'types/util'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderAssetName, renderLastName } from 'helpers/tables'

export const columns: Array<TableColumn<DSWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'identity.individual.firstName',
    label: 'Name',
    render: renderLastName
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'asset',
    label: 'Security Token',
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
