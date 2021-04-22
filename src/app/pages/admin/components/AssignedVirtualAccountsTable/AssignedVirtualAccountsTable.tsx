import { Grid } from '@material-ui/core'
import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'
import { Filters } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Filters'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
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
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Filters />
      </Grid>
      <Grid item>
        <TableView<AssignedVirtualAccount>
          uri={virtualAccounts.getAll}
          name={virtualAccountQueryKeys.listAssigned}
          columns={columns}
          hasActions
          actions={Actions}
          filter={filter}
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
      </Grid>
    </Grid>
  )
}
