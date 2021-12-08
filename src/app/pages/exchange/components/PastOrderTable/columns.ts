import { formatDateToMMDDYY } from 'helpers/dates'
import { formatAmount, formatPercent } from 'helpers/numbers'
import { getOrderSideName } from 'helpers/strings'
import { renderOrderStatus } from 'helpers/rendering'
import { compactColumns } from 'app/pages/exchange/components/OpenOrders/columns'
import { TableColumn } from 'types/util'
import { Order } from 'types/order'

export const columns: Array<TableColumn<Order>> = [
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
    key: 'filledPercent',
    render: formatPercent
  },
  {
    label: 'Status',
    key: 'status',
    render: renderOrderStatus
  }
]

export const pastOrderCompactColumns: Array<TableColumn<Order>> = [
  ...compactColumns,
  {
    label: 'Status',
    key: 'status',
    render: renderOrderStatus
  }
]
