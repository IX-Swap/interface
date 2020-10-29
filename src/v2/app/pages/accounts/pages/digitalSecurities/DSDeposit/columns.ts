import { formatAmount } from 'v2/helpers/numbers'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'

export const columns = [
  {
    label: 'Digital Security',
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
    render: formatAmount
  },
  {
    label: 'Date',
    key: 'date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Information',
    key: 'hash'
  }
]
