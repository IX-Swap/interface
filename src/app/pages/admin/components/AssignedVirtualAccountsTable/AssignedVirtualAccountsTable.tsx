import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import React from 'react'

export interface AssignedVirtualAccount {
  assigned: string
  name: string
  virtualAccounts: string
  currency: 'SGD' | 'USD'
  availableBalance: number
  balanceOnHold: number
  outstandingBalance: number
}

export const AssignedVirtualAccountsTable = () => {
  return (
    <TableView<AssignedVirtualAccount>
      uri={virtualAccounts.getAll}
      name={virtualAccountQueryKeys.listAssigned}
      columns={columns}
      hasActions
      actions={Actions}
      filter={{}}
      fakeItems={[
        {
          assigned:
            'Wed Apr 21 2021 15:03:47 GMT+0800 (Philippine Standard Time)',
          name: 'Selmer',
          virtualAccounts: '0000000000012',
          currency: 'USD',
          availableBalance: 10000,
          balanceOnHold: 10000,
          outstandingBalance: 1000
        }
      ]}
    />
  )
}
