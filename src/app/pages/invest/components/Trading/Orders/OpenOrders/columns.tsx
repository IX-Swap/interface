import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  formatRoundedAmount,
  getOrderCurrency,
  getRoundedPercentage,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
import React from 'react'
import { OpenOTCOrder, OTCOrder, ColumnOTCMatch } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { renderOpenOrderStatus } from './helpers'

export const columns = [
  {
    label: <HeadCellWithSort label={'Date'} field={'createdAt'} />,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: <HeadCellWithSort label={'Pair'} field={'name'} />,
    key: 'pair.name',
    render: renderTicker
  },
  {
    label: <HeadCellWithSort label={'Side'} field={'orderType'} />,
    key: 'orderType',
    render: capitalizeFirstLetter
  },
  {
    label: <HeadCellWithSort label={'Price'} field={'price'} />,
    key: 'price',
    render: (
      value: number | null,
      row: OTCOrder | OpenOTCOrder | ColumnOTCMatch
    ) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: <HeadCellWithSort label={'Quantity'} field={'availableAmount'} />,
    align: 'center',
    render: (_: any, row: { amount: any }) =>
      formatRoundedAmount(row?.amount ?? 0)
    // render: (_: any, row: { amount: any }) => row?.amount ?? 0
  },
  {
    key: 'amount',
    label: <HeadCellWithSort label={'Total'} field={'amount'} />,
    render: (_: any, row: { amount: any; price: any }) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    label: <HeadCellWithSort label={'Status'} field={'_id'} />,
    key: '_id',
    render: (_: any, row: OpenOTCOrder) => renderOpenOrderStatus(row)
  }
]

export const compactColumns = [
  {
    label: <HeadCellWithSort label={'Date'} field={'createdAt'} />,
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: <HeadCellWithSort label={'Pair'} field={'name'} />,
    key: 'pair.name',
    render: renderTicker
  },
  {
    label: <HeadCellWithSort label={'Side'} field={'orderType'} />,
    key: 'orderType',
    render: capitalizeFirstLetter
  },
  {
    label: <HeadCellWithSort label={'Price'} field={'price'} />,
    key: 'price',
    render: (
      value: number | null,
      row: OTCOrder | OpenOTCOrder | ColumnOTCMatch
    ) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: <HeadCellWithSort label={'Quantity'} field={'availableAmount'} />,
    align: 'center',
    render: (_: any, row: { amount: any }) =>
      formatRoundedAmount(row?.amount ?? 0)
    // render: (_: any, row: { amount: any }) => row?.amount ?? 0
  },
  {
    key: 'amount',
    label: <HeadCellWithSort label={'Total'} field={'amount'} />,
    render: (_: any, row: { amount: any; price: any }) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  {
    label: <HeadCellWithSort label={'Status'} field={'_id'} />,
    key: '_id',
    render: (_: any, row: OpenOTCOrder) => renderOpenOrderStatus(row)
  }
]

export const nestedcolumns: Array<TableColumn<ColumnOTCMatch>> = [
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
    key: 'matchedPrice',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'matchedAmount',
    label: 'Quantity',
    align: 'center',
    // render: (_, row) => formatRoundedAmount(row?.matchedAmount ?? 0)
    render: (_, row) => row?.matchedAmount ?? 0
  },
  {
    key: 'user',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.matchedAmount, price: row.matchedPrice, row })
  },
  {
    key: '_id',
    label: 'Status',
    render: (_, row) =>
      getRoundedPercentage({
        amount: +row.parentAmount,
        matchedAmount: +row.matchedAmount ?? 0
      })
  }
]
