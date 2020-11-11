import React from 'react'
import { TableColumn } from 'v2/types/util'
import { formatMoney, formatAmount } from 'v2/helpers/numbers'
import { Commitment } from 'v2/types/commitment'
import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { DSOLogo } from 'v2/app/components/DSO/components/DSOLogo'

export const renderCommitmentMoney = (a: number, row: Commitment) =>
  formatMoney(a, row.currency.numberFormat.currency)

export const renderCommitmentAvatar = (a: string, row: Commitment) => (
  <DSOLogo dsoId={row.dso._id} size={40} />
)

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: '_id',
    label: '',
    render: renderCommitmentAvatar
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
    render: renderCommitmentMoney
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
    render: renderCommitmentMoney
  },
  {
    key: 'numberOfUnits',
    label: 'Number of Digital Securities',
    align: 'right',
    headAlign: 'right',
    render: formatAmount
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]

export default columns
