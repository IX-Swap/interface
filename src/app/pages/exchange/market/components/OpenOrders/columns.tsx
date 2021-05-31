import React from 'react'
import { CancelOrderButton } from 'app/pages/exchange/market/components/OpenOrders/CancelOrderButton'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney, toPercentage } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getOrderSideName } from 'helpers/strings'

export interface Order {
  createdAt: string
  pair: string
  side: string
  price: number
  amount: number
  total: number
  filled: number
}

export const columns: Array<TableColumn<Order>> = [
  {
    key: 'date',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Ticker',
    key: 'pair'
  },
  {
    key: 'side',
    label: 'Side',
    render: getOrderSideName
  },
  {
    key: 'price',
    label: 'Price',
    render: (_, value) => formatMoney(value.price, '')
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (_, value) => formatMoney(value.amount, '')
  },
  {
    key: 'total',
    label: 'Total',
    render: (_, value) => formatMoney(value.total, '')
  },
  {
    key: 'filled',
    label: 'Filled',
    render: toPercentage
  },
  {
    key: 'cancel',
    label: '',
    render: (_, order) => <CancelOrderButton order={order} />
  }
]
