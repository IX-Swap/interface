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
    label: 'Total Tokens',
    key: 'total',
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
  },
  {
    label: 'Available Tokens',
    key: 'available',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: formatAmount
  }
]

export const custodyColumns: Array<TableColumn<AssetBalance>> = [
  ...columns.slice(0, 2),
  {
    label: 'Custody',
    key: 'custody'
  },
  ...columns.slice(2)
]
