import React from 'react'
import { Order } from 'types/order'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatAmount, formatCamelCase, toPercentage } from 'helpers/numbers'
import { OrderStatus } from 'app/pages/exchange/market/components/PastOrderTable/OrderStatus'

const renderOrderStatus = (status: Order['status']) => {
  return <OrderStatus status={status} />
}

export const columns = [
  {
    label: 'Date',
    key: 'date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Ticker',
    key: 'pair'
  },
  {
    label: 'Type',
    key: 'type'
  },
  {
    label: 'Side',
    key: 'side',
    render: formatCamelCase
  },
  {
    label: 'Price',
    key: 'price',
    render: formatAmount
  },
  {
    label: 'Amount',
    key: 'amount'
  },
  {
    label: 'Total',
    key: 'total',
    render: formatAmount
  },
  {
    label: 'Filled',
    key: 'filled',
    render: toPercentage
  },
  {
    label: 'Status',
    key: 'status',
    render: renderOrderStatus
  }
]
