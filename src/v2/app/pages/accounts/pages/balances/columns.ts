import { TableColumn } from 'v2/types/util'
import { AssetBalance } from 'v2/types/balance'
import { renderAmount, renderAssetBalance } from 'v2/helpers/tables'

export const columns: Array<TableColumn<AssetBalance>> = [
  {
    key: 'symbol',
    label: 'Asset',
    render: renderAssetBalance
  },
  {
    key: 'balance',
    label: 'Balance',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: renderAmount
  },
  {
    key: 'onHold',
    label: 'On Hold',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: renderAmount
  },
  {
    key: 'available',
    label: 'Available',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: renderAmount
  }
]
