import { TableColumn } from 'v2/types/util'
import { AssetBalance } from 'v2/types/balance'
import { formatAmount } from 'v2/helpers/numbers'

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
    render: formatAmount
  },
  {
    label: 'Available Balance',
    key: 'available',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    label: 'On Hold',
    key: 'onHold',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  }
]
