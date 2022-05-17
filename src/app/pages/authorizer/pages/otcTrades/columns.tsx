import { renderMoney } from 'app/pages/exchange/components/OpenOrders/columns'
import { formatDateToMMDDYY } from 'helpers/dates'
import { MatchedOTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<MatchedOTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'buyer._id',
    label: 'Buyer'
  },
  {
    key: 'seller._id',
    label: 'Seller'
    // render: renderRepresentativeName
  },
  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Amount'
    // render: renderAmount
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) => renderMoney(row.amount * row.price, row)
  }
]
