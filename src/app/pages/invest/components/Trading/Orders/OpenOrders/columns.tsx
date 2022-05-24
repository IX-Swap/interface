import { Typography } from '@mui/material'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'

export const renderTicker = (value: string, row: any) => (
  <Typography variant='subtitle1'>{value}</Typography>
)

export const renderMoney = (value: any, row: any) => formatMoney(value, '')
export const renderAmount = (value: any, row: any) =>
  Number.isInteger(value) ? formatMoney(value, '') : value

export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair.name'
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
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
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, __) => '100%'
  }
]

export const compactColumns: Array<TableColumn<OTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    label: 'Amount',
    key: 'amount',
    render: renderMoney
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },

  {
    key: 'price',
    label: 'Price',
    render: renderMoney
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) => renderMoney(row.amount * row.price, row)
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, __) => '100%'
  }
]
