import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  formatRoundedAmount,
  getOrderCurrency,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
import { OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { renderOpenOrderPercentage } from './helpers'

export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: 'Quantity',
    align: 'center',
    render: (_, row) => formatRoundedAmount(row?.matches?.matchedAmount ?? 0)
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) => renderOpenOrderPercentage(row)
  }
]

export const compactColumns: Array<TableColumn<OTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'amount',
    label: 'Quantity',
    render: (_, row) => formatRoundedAmount(row?.matches?.matchedAmount ?? 0)
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) => renderOpenOrderPercentage(row)
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
