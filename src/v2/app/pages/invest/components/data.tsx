import React from 'react'
import { TableColumn } from 'v2/types/util'
import { formatMoney } from 'v2/helpers/numbers'
import { Commitment } from 'v2/types/commitment'
import DsoImage from 'v2/app/components/digital-security/image'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: '_id',
    label: '',
    render: (a: string, row: Commitment) => <DsoImage dsoId={row.dso._id} />
  },
  {
    key: 'dso.tokenSymbol',
    label: 'Name'
  },
  {
    key: 'pricePerUnit',
    label: 'Unit Price',
    align: 'right',
    headAlign: 'right',
    render: (a: number, row: Commitment) =>
      formatMoney(a, row.currency.numberFormat.currency)
  },
  {
    key: 'dso.capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'totalAmount',
    label: 'Investment Amount',
    align: 'right',
    headAlign: 'right',
    render: (a: number, row: Commitment) =>
      formatMoney(a, row.currency.numberFormat.currency)
  },
  {
    key: 'numberOfUnits',
    label: 'Number of Digital Securities',
    align: 'right',
    headAlign: 'right',
    render: (a: number) => formatMoney(a, '')
  },
  {
    key: 'status',
    label: ''
  }
]

export default columns
