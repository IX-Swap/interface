import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  formatRoundedAmount,
  getOrderCurrency,
  getRoundedPercentage,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
import { ColumnOTCMatch, OpenOTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { renderOpenOrderPercentage } from './helpers'

export const columns: Array<TableColumn<OpenOTCOrder>> = [
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
    render: (_, row) => formatRoundedAmount(row?.amount ?? 0)
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
export const nestedcolumns: Array<TableColumn<ColumnOTCMatch>> = [
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
    key: 'matchedPrice',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'matchedAmount',
    label: 'Quantity',
    align: 'center',
    render: (_, row) => formatRoundedAmount(row?.matchedAmount ?? 0)
  },
  {
    key: 'user',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.matchedAmount, price: row.matchedPrice, row })
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) =>
      getRoundedPercentage({
        amount: row.parentAmount,
        matchedAmount: row.matchedAmount ?? 0
      })
  }
]
export const compactColumns: Array<TableColumn<OpenOTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'amount',
    label: 'Quantity',
    render: (_, row) => formatRoundedAmount(row?.amount ?? 0)
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
