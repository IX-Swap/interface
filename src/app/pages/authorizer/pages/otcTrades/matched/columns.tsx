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
    key: 'identity._id',
    label: 'Seller',
    render: (_, item) => renderIdentityLink(item, 'SELL')
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderMoney
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
