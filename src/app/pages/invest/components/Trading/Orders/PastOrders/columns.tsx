import { Typography } from '@mui/material'
import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  getFilledPercentage,
  getOrderCurrency,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderRowAmount, renderTicker } from 'helpers/tables'
import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { TableColumn } from 'types/util'

const SimpleStatus = ({ status }: { status: string }) => {
  const { theme } = useAppTheme()
  return (
    <Typography
      color={
        status === OTCOrderStatus.CANCELLED
          ? theme.palette.error.main
          : 'initial'
      }
    >
      {capitalizeFirstLetter(status)}
    </Typography>
  )
}
export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderRowAmount
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) =>
      getFilledPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, _) => <SimpleStatus status={value} />
  }
]

export const compactColumns: Array<TableColumn<OTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, _) => <SimpleStatus status={value} />
  },
  {
    key: 'amount',
    label: 'Amount',
    render: renderRowAmount
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },

  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    key: '_id',
    label: 'Filled',
    render: (_, row) =>
      getFilledPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
