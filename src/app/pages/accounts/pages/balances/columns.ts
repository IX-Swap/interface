import { TableColumn } from 'types/util'
import { AssetBalance } from 'types/balance'
import { renderAmount, renderAssetBalance } from 'helpers/tables'

export const columns: Array<TableColumn<AssetBalance>> = [
  {
    key: 'symbol',
    label: 'Asset',
    render: renderAssetBalance
  },
  {
    key: 'available',
    label: 'Total',
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
    key: 'balance',
    label: 'Available',
    headAlign: 'right',
    align: 'right',
    secret: true,
    render: renderAmount
  }
]
