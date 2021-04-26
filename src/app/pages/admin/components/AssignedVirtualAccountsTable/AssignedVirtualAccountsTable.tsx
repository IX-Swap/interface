import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import React from 'react'
import User from 'types/user'

export interface AssignedVirtualAccount {
  assignedAt: string
  user: User
  accountNumber: string
  currency: 'SGD' | 'USD'
  balance: {
    available: number
    onHold: number
    outstanding: number
  }
}

export const AssignedVirtualAccountsTable = () => {
  const filter = {
    isAssigned: true
  }
  return (
    <TableView<AssignedVirtualAccount>
      uri={virtualAccounts.getAll}
      name={virtualAccountQueryKeys.listAssigned}
      columns={columns}
      hasActions
      actions={Actions}
      filter={filter}
    />
  )
}
