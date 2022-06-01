import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  getFilledMatchesPercentage,
  getFilledPercentage,
  getOrderCurrency,
  renderMoney,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
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
    label: 'Matched amount',
    align: 'center',
    render: (value, row) =>
      formatMoney(row?.matches?.matchedAmount ?? 0, '', false)
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
      getFilledMatchesPercentage({
        amount: row.amount,
        matchedAmount: row.matches?.matchedAmount ?? 0
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
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },

  {
    key: 'amount',
    label: 'Amount',
    render: renderMoney
  },
  {
    key: 'availableAmount',
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
