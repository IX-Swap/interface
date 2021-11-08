import React from 'react'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney, formatPercent } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getOrderSideName } from 'helpers/strings'
import { Order } from 'types/order'
import { Typography } from '@material-ui/core'

export const renderTicker = (value: string, row: any) => {
  return <Typography variant='subtitle1'>{value}</Typography>
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
    key: 'filledPercent',
    label: 'Filled',
    render: formatPercent
  }
]

export const compactColumns: Array<TableColumn<Order>> = [
  {
    label: 'Ticker',
    key: 'pair',
    render: renderTicker
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (_, value) => formatMoney(value.amount, '')
  },
  {
    key: 'side',
    label: 'Side',
    render: getOrderSideName
  },
  {
    key: 'timeInForce',
    label: 'Time In Force'
  },
  {
    key: 'price',
    label: 'Price',
    render: (_, value) => formatMoney(value.price, '')
  },
  {
    key: 'total',
    label: 'Total',
    render: (_, value) => formatMoney(value.total, '')
  },
  {
    key: 'filledPercent',
    label: 'Filled',
    render: formatPercent
  },
  {
    key: 'date',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
