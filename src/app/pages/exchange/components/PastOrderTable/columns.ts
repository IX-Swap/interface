import { formatDateToMMDDYY } from 'helpers/dates'
import { formatAmount, toPercentage } from 'helpers/numbers'
import { getOrderSideName } from 'helpers/strings'
import { renderOrderStatus } from 'helpers/rendering'

export const columns = [
  {
    label: 'Date',
    key: 'date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair'
  },
  {
    label: 'Type',
    key: 'type'
  },
  {
    label: 'Side',
    key: 'side',
    render: getOrderSideName
  },
  {
    label: 'Price',
    key: 'price',
    render: formatAmount
  },
  {
    label: 'Amount',
    key: 'amount'
  },
  {
    label: 'Total',
    key: 'total',
    render: formatAmount
  },
  {
    label: 'Filled',
    key: 'filled',
    render: toPercentage
  },
  {
    label: 'Status',
    key: 'status',
    render: renderOrderStatus
  }
]
