import React from 'react'
import { TableColumn } from 'v2/types/util'
import { formatMoney } from 'v2/helpers/numbers'
import { Commitment } from 'v2/types/commitment'
import { Avatar } from 'v2/components/Avatar'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: '_id',
    label: '',
    render: (a: string, row: Commitment) => (
      <Avatar
        documentId={row.dso.logo}
        ownerId={row.dso.user}
        size={40}
        variant='circle'
      />
    )
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
    label: 'Status'
  }
]

export default columns
