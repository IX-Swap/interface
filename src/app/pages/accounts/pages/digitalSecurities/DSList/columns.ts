import { TableColumn } from 'types/util'
import { AssetBalance } from 'types/balance'
import { formatAmount } from 'helpers/numbers'

export const columns: Array<TableColumn<AssetBalance>> = [
  {
    label: 'Symbol',
    key: 'symbol'
  },
  {
    label: 'Name',
    key: 'name'
  },
  {
    label: 'Total Balance',
    key: 'balance',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: formatAmount
  },
  {
    label: 'Available Balance',
    key: 'available',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: formatAmount
  },
  {
    label: 'On Hold',
    key: 'onHold',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: formatAmount
  }
]
