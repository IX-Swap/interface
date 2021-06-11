import React from 'react'
import { CancelOrderButton } from 'app/pages/exchange/components/OpenOrders/CancelOrderButton'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney, toPercentage } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getOrderSideName } from 'helpers/strings'
import { Order } from 'types/order'

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
