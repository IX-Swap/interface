import { TableColumn } from '../../../../../../types/util'
import { AssetBalance } from '../../../../../../types/balance'

const columns: Array<TableColumn<AssetBalance>> = [
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
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'Available Balance',
    key: 'available',
    headAlign: 'right',
    align: 'right',
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'On Hold',
    key: 'onHold',
    headAlign: 'right',
    align: 'right',
    render: (value: number) =>
      value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
]

export default columns
