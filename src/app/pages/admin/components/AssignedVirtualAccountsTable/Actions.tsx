import React from 'react'
import { AssignedVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { ViewAssignedVirtualAccountAction } from 'app/pages/admin/components/AssignedVirtualAccountsTable/ViewAssignedVirtualAccountAction'

export interface ActionsProps {
  item: AssignedVirtualAccount
}

export const Actions = ({ item }: ActionsProps) => {
  return <ViewAssignedVirtualAccountAction item={item} />
}
