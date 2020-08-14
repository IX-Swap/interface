import { TableColumn } from '../../../../../types/util'

import { AssetBalance } from '../../../../../types/balance'
import { formatMoney } from '../../../../../helpers/numbers'

const columns: Array<TableColumn<AssetBalance>> = [
  {
    key: 'symbol',
    label: 'Asset',
    render: (val: string, row: AssetBalance) => `${row.name} (${val})`
  },
  {
    key: 'balance',
    label: 'Balance',
    headAlign: 'right',
    align: 'right',
    render: (val: number) => formatMoney(val, '')
  },
  {
    key: 'onHold',
    label: 'On Hold',
    headAlign: 'right',
    align: 'right',
    render: (val: number) => formatMoney(val, '')
  },
  {
    key: 'available',
    label: 'Available',
    headAlign: 'right',
    align: 'right',
    render: (val: number) => formatMoney(val, '')
  }
]

export default columns
