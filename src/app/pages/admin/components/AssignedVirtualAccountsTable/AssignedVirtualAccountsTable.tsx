import { Grid } from '@material-ui/core'
import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'
import { Filters } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Filters'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
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
  const { getFilterValue } = useQueryFilter()

  const currencyFilterValue = getFilterValue('currency')
  const bothCurrency =
    currencyFilterValue !== undefined &&
    currencyFilterValue.split(',').length > 1

  const filter = {
    search: getFilterValue('search'),
    currency:
      currencyFilterValue === '' || bothCurrency
        ? undefined
        : currencyFilterValue
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
        />
      </Grid>
    </Grid>
  )
}
