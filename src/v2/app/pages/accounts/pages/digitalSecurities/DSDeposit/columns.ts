import moment from 'moment'
import { formatAmount } from 'v2/helpers/numbers'

export const columns = [
  {
    label: 'Digital Security',
    key: 'asset.symbol'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Amount',
    key: 'amount',
    render: formatAmount
  },
  {
    label: 'Date',
    key: 'date',
    render: (value: any) => moment(value).format('MM/DD/YYYY')
  },
  {
    label: 'Information',
    key: 'hash'
  }
]
