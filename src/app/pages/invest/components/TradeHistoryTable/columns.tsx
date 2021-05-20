import { Side } from 'app/pages/invest/components/TradeHistoryTable/Side'
import { formatDistance } from 'date-fns'
import { formatAmount } from 'helpers/numbers'
import React from 'react'
import { TableColumn } from 'types/util'

const renderAmount = (amount: number) => formatAmount(amount)
const renderDate = (date: string) =>
  formatDistance(new Date(date), new Date(), { addSuffix: true })
const renderSide = (side: 'BUY' | 'SELL') => <Side side={side} />

export const columns: Array<TableColumn<any>> = [
  {
    key: 'date',
    label: 'Date',
    render: renderDate
  },
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'side',
    label: 'Side',
    render: renderSide
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'investedAmount',
    label: 'Invested Amount',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'unitPrice',
    label: 'Unit Price',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'totalAmount',
    label: 'Total Amount',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  }
]
