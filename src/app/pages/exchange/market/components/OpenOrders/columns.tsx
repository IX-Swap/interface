import React from 'react'
import { CancelOrderButton } from 'app/pages/exchange/market/components/OpenOrders/CancelOrderButton'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import { renderPercentage } from 'helpers/rendering'
import { TableColumn } from 'types/util'

export interface Order {
  createdAt: string
  side: string
  tif: string
  price: number
  amount: number
  total: number
  filled: number
}

export const columns: Array<TableColumn<Order>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'side',
    label: 'Side'
  },
  {
    key: 'tif',
    label: 'Time-In-Force'
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
    render: renderPercentage
  },
  {
    key: 'cancel',
    label: '',
    render: (_, order) => <CancelOrderButton order={order} />
  }
]
