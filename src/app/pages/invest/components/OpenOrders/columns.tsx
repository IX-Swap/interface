import { formatDateToMMDDYY } from 'helpers/dates'
import { formatPercent, renderMoney } from 'helpers/numbers'
import { getOrderSideName } from 'helpers/strings'
import { renderRowAmount, renderTicker } from 'helpers/tables'
import { Order } from 'types/order'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<Order>> = [
  {
    key: 'date',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Ticker',
    key: 'pair'
  },
  {
    key: 'side',
    label: 'Side',
    render: getOrderSideName
  },
  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderRowAmount
  },
  {
    key: 'total',
    label: 'Total',
    render: renderMoney
  },
  {
    key: 'filledPercent',
    label: 'Filled',
    render: formatPercent
  }
]

export const compactColumns: Array<TableColumn<Order>> = [
  {
    label: 'Ticker',
    key: 'pair',
    render: renderTicker
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderMoney
  },
  {
    key: 'side',
    label: 'Side',
    render: getOrderSideName
  },
  {
    key: 'timeInForce',
    label: 'Time In Force'
  },
  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'total',
    label: 'Total',
    render: renderMoney
  },
  {
    key: 'filledPercent',
    label: 'Filled',
    render: formatPercent
  },
  {
    key: 'date',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
