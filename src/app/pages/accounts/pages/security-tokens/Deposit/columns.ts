import { formatAmount } from 'helpers/numbers'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderStatusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'

export const columns = [
  {
    label: 'Security Token',
    key: 'asset.symbol'
  },
  {
    label: 'Status',
    key: 'status',
    render: renderStatusColumn
  },
  {
    label: 'Amount',
    key: 'amount',
    secret: true,
    render: formatAmount
  },
  {
    label: 'Date',
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: 'Information',
    key: 'hash',
    secret: true
  }
]
