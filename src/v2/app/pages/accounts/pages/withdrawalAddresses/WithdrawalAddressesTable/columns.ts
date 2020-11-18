import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderAddressColumn } from 'v2/helpers/rendering'

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
    label: 'Withdrawal Address',
    render: renderAddressColumn
  },
  {
    key: 'memo',
    label: 'Memo'
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]
