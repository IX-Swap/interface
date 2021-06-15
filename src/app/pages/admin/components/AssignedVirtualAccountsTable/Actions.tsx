import React from 'react'
import { UnassignVirtualAccount } from 'app/pages/admin/components/AssignedVirtualAccountsTable/UnassignVirtualAccountButton'
import { VirtualAccount } from 'types/virtualAccount'

export interface ActionsProps {
  item: VirtualAccount
}

export const Actions = ({ item }: ActionsProps) => {
  return <UnassignVirtualAccount item={item} />
}
