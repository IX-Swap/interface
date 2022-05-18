import { renderMoney } from 'app/pages/exchange/components/OpenOrders/columns'
import { renderAmount } from 'helpers/tables'
import React from 'react'
import { OrderType, UnmatchedOTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { OrderTableIdentityLink } from '../OrderTableIdentityLink'

export const getColumns = (
  side: OrderType
): Array<TableColumn<UnmatchedOTCOrder>> => [
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'user.userId',
    label: side === 'BUY' ? 'Buyer' : 'Seller',
    render: (userId, { user }) => <OrderTableIdentityLink user={user} />
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
