import React from 'react'
import { ViewAssignedVirtualAccountAction } from 'app/pages/admin/components/AssignedVirtualAccountsTable/ViewAssignedVirtualAccountAction'
import { VirtualAccount } from 'types/virtualAccount'

export interface ActionsProps {
  item: VirtualAccount
}

export const Actions = ({ item }: ActionsProps) => {
  return <ViewAssignedVirtualAccountAction item={item} />
}
