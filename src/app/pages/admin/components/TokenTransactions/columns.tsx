import React from 'react'
import { formatAmount } from 'helpers/numbers'
import { formatDateToMMDDYY } from 'helpers/dates'
import { TableColumn } from 'types/util'
import { renderWrappedContent } from 'helpers/rendering'
import { CustodyDetails } from './CustodyDetails'

export const columns: Array<TableColumn<any>> = [
  {
    key: '_id',
    label: 'ID',
    render: id => renderWrappedContent(id)
  },
  {
    key: 'name',
    label: 'Username'
  },
  {
    key: 'email',
    label: 'Email',
    render: email => renderWrappedContent(email)
  },
  {
    key: 'tokenSymbol',
    label: 'STO Symbol'
  },
  {
    key: 'tokenName',
    label: 'STO Name'
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'amount',
    label: 'Amount',
    render: formatAmount
  },
  {
    key: 'source',
    label: 'Source',
    render: source => renderWrappedContent(source)
  },
  {
    key: 'comment',
    label: 'Comment'
  },
  {
    key: 'details',
    label: 'Details',
    render: details => <CustodyDetails details={details} />
  },
  {
    key: 'createdAt',
    label: 'Created at',
    render: formatDateToMMDDYY
  }
  //   {
  //     key: 'date',
  //     label: 'Date',
  //     render: renderDate
  //   },
  //   {
  //     key: 'pair',
  //     label: 'Pair'
  //   },
  //   {
  //     key: 'name',
  //     label: 'Name'
  //   },
  //   {
  //     key: 'side',
  //     label: 'Side',
  //     render: renderSide
  //   },
  //   {
  //     key: 'type',
  //     label: 'Type'
  //   },
  //   {
  //     key: 'amount',
  //     label: 'Invested Amount',
  //     headAlign: 'right',
  //     align: 'right',
  //     render: formatAmount
  //   },
  //   {
  //     key: 'price',
  //     label: 'Unit Price',
  //     headAlign: 'right',
  //     align: 'right',
  //     render: formatAmount
  //   },
  //   {
  //     key: 'total',
  //     label: 'Total Amount',
  //     headAlign: 'right',
  //     align: 'right',
  //     render: formatAmount
  //   }
]
