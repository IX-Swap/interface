import { formatMoney, getOrderCurrency, renderTotal } from 'helpers/numbers'
import { OrderType, OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { renderIdentityLink } from '../OrderTableIdentityLink'

export const getColumns = (side: OrderType): Array<TableColumn<OTCOrder>> => [
  {
    key: 'pair.name',
    label: 'Pair'
  },
  {
    key: '_id',
    label: side === 'BUY' ? 'Buyer' : 'Seller',
    render: (value, item) => renderIdentityLink(item, 'Creator')
  },
  {
    key: 'user',
    label: 'Phone',
    render: (value, item) =>
      item?.identity?.individual !== undefined
        ? item?.identity?.individual?.contactNumber
        : item?.identity?.corporate?.contactNumber
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: 'Amount',
    render: (value, row) => formatMoney(value, '')
  },
  {
    key: '_id',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  }
]
