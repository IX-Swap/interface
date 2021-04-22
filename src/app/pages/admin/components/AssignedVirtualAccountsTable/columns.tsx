import { Typography } from '@material-ui/core'
import { AssignedVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { getTimeFromNow } from 'helpers/dates'
import { TableColumn } from 'types/util'
import React from 'react'
import { formatMoney } from 'helpers/numbers'

export const renderAssignedDate = (value: any, row: AssignedVirtualAccount) => {
  if (value === undefined) {
    return null
  }
  return <Typography noWrap>{getTimeFromNow(new Date(value))}</Typography>
}

export const renderAmount = (value: any, row: AssignedVirtualAccount) => {
  return formatMoney(value, '')
}

export const columns: Array<TableColumn<AssignedVirtualAccount>> = [
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
