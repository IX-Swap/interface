import { renderMoney } from 'app/pages/exchange/components/OpenOrders/columns'
import { renderAmount } from 'helpers/tables'
import { OrderType, UnmatchedOTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'

export const getColumns = (
  side: OrderType
): Array<TableColumn<UnmatchedOTCOrder>> => [
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'user._id',
    label: side === 'BUY' ? 'Buyer' : 'Seller'
  },
  {
    key: 'user.phoneNumber',
    label: 'Phone'
  },
  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderAmount
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) => renderMoney(row.amount * row.price, row)
  }
]
