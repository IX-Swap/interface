import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  getFilledPercentage,
  getOrderCurrency,
  renderMoney,
  renderTotal
} from 'helpers/numbers'
import { OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { renderIdentityLink } from '../OrderTableIdentityLink'

export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'pair.name',
    label: 'Pair'
  },
  {
    key: 'user',
    label: 'Buyer',
    render: (_, item) => renderIdentityLink(item, 'BUY')
  },
  {
    key: 'ethAddress',
    label: 'Filled Buy',
    render: (_, row) =>
      getFilledPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  },
  {
    key: 'identity._id',
    label: 'Seller',
    render: (_, item) => renderIdentityLink(item, 'SELL')
  },
  {
    key: '_id',
    label: 'Filled Sell',
    render: (_, row) =>
      getFilledPercentage({
        amount: row.matches?.matchedOrder?.amount ?? 1,
        availableAmount: row.matches?.matchedOrder?.availableAmount
      })
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: 'Amount',
    render: (_, row) => formatMoney(row?.matches?.matchedAmount ?? 0, '')
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({
        amount: row?.matches?.matchedAmount ?? 0,
        price: row.price,
        row
      })
  }
]
