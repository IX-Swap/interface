//
import { formatNumber } from 'helpers/formatNumbers'

export const columns = [
  {
    key: 'symbol',
    label: 'Asset',
    render: (val, row) => `${row.name} (${val})`
  },
  {
    key: 'balance',
    label: 'Balance',
    headAlign: 'right',
    align: 'right',
    render: val => formatNumber(val)
  },
  {
    key: 'onHold',
    label: 'On Hold',
    headAlign: 'right',
    align: 'right',
    render: val => formatNumber(val)
  },
  {
    key: 'available',
    label: 'Available',
    headAlign: 'right',
    align: 'right',
    render: val => formatNumber(val)
  }
]
