import { Typography } from '@material-ui/core'
import { AssignedVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { getTimeFromNow } from 'helpers/dates'
import { TableColumn } from 'types/util'
import React from 'react'
import { formatMoney } from 'helpers/numbers'

export const renderAssignedDate = (value: any, row: AssignedVirtualAccount) => {
  return <Typography noWrap>{getTimeFromNow(new Date(value))}</Typography>
}

export const renderAmount = (value: any, row: AssignedVirtualAccount) => {
  return formatMoney(value, '')
}

export const columns: Array<TableColumn<AssignedVirtualAccount>> = [
  {
    key: 'assigned',
    label: 'Assigned',
    render: renderAssignedDate
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'virtualAccounts',
    label: 'Virtual Accounts'
  },
  {
    key: 'currency',
    label: 'Currency'
  },
  {
    key: 'availableBalance',
    label: 'Available Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balanceOnHold',
    label: 'Balance on Hold',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'outstandingBalance',
    label: 'Outstanding Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  }
]
