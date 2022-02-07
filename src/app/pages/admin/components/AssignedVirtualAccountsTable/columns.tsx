import { Typography } from '@mui/material'
import { getTimeFromNow } from 'helpers/dates'
import { TableColumn } from 'types/util'
import React from 'react'
import { formatMoney } from 'helpers/numbers'
import { VirtualAccount } from 'types/virtualAccount'

export const renderAssignedDate = (value: any, row: VirtualAccount) => {
  if (value === undefined) {
    return null
  }
  return <Typography noWrap>{getTimeFromNow(new Date(value))}</Typography>
}

export const renderAmount = (value: any, row: VirtualAccount) => {
  return formatMoney(value, '')
}

export const columns: Array<TableColumn<VirtualAccount>> = [
  {
    key: 'assignedAt',
    label: 'Assigned',
    render: renderAssignedDate
  },
  {
    key: 'user.name',
    label: 'Name'
  },
  {
    key: 'accountNumber',
    label: 'Virtual Accounts'
  },
  {
    key: 'currency',
    label: 'Currency'
  },
  {
    key: 'balance.available',
    label: 'Available Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balance.onHold',
    label: 'Balance on Hold',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balance.outstanding',
    label: 'Outstanding Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  }
]
