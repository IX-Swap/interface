import { Typography } from '@mui/material'
import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  //   formatRoundedAmount,
  //   getFilledPercentageFromMatches,
  getOrderCurrency,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { OpenOTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { TableColumn } from 'types/util'

const SimpleStatus = ({ status }: { status: string }) => {
  const { theme } = useAppTheme()

  const statusColors = {
    [OTCOrderStatus.CANCELLED.toString()]: theme.palette.error.main,
    [OTCOrderStatus.COMPLETED.toString()]: '#8DCA82',
    [OTCOrderStatus.REJECTED.toString()]: '#D20000'
  }

  return (
    <Typography
      variant='body2'
      color={
        Object.prototype.hasOwnProperty.call(statusColors, status)
          ? statusColors[status]
          : 'initial'
      }
    >
      {capitalizeFirstLetter(status)}
    </Typography>
  )
}
export const columns: Array<TableColumn<OpenOTCOrder>> = [
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
    label: 'Quantity',
    // render: (value, _) => formatRoundedAmount(value)
    render: (value, _) => value
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  //   {
  //     key: '_id',
  //     label: 'Filled',
  //     render: (_, row) => getFilledPercentageFromMatches({ row })
  //   },
  {
    key: 'status',
    label: 'Status',
    render: (value, _) => <SimpleStatus status={value} />
  }
]

export const compactColumns: Array<TableColumn<OpenOTCOrder>> = [
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
    label: 'Quantity',
    // render: (value, _) => formatRoundedAmount(value)
    render: (value, _) => value
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
  //   {
  //     key: '_id',
  //     label: 'Filled',
  //     render: (_, row) => getFilledPercentageFromMatches({ row })
  //   },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
