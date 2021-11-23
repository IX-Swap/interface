import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAddressColumn } from 'helpers/rendering'

export const columns = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'network.name',
    label: 'Blockchain Network'
  },
  {
    key: 'label',
    label: 'Address Label'
  },
  {
    key: 'address',
    label: 'Blockchain Address',
    render: renderAddressColumn
  },
  {
    key: 'memo',
    label: 'Memo'
  },
  {
    key: 'status',
    label: 'Status'
  }
]
