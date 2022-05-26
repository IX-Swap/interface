import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  getFilledPercentage,
  getOrderCurrency,
  renderMoney,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderRowAmount, renderTicker } from 'helpers/tables'
import { OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair.name'
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
    key: 'amount',
    label: 'Amount',
    render: renderRowAmount
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
    render: (_, row) =>
      getFilledPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  }
]

export const compactColumns: Array<TableColumn<OTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    label: 'Amount',
    key: 'amount',
    render: renderMoney
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) =>
      getFilledPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  }
]
