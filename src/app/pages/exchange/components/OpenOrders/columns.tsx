import React from 'react'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney, formatPercent } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getOrderSideName } from 'helpers/strings'
import { Order } from 'types/order'
import { Typography } from '@mui/material'

export const renderTicker = (value: string, row: any) => {
  return <Typography variant='subtitle1'>{value}</Typography>
}

export const renderMoney = (value: any, row: any) => formatMoney(value, '')

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
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderMoney
  },
  {
    key: 'total',
    label: 'Total',
    render: renderMoney
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
    render: renderMoney
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
    render: renderMoney
  },
  {
    key: 'total',
    label: 'Total',
    render: renderMoney
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
