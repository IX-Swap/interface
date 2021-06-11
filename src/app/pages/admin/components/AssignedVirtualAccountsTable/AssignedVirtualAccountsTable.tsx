import { Grid } from '@material-ui/core'
import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import { columns } from 'app/pages/admin/components/AssignedVirtualAccountsTable/columns'
import { Filters } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Filters'
import { useResetSelectionOnUnmount } from 'app/pages/admin/hooks/useResetSelectionOnUnmount'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export const AssignedVirtualAccountsTable = () => {
  useResetSelectionOnUnmount()
  const { getFilterValue } = useQueryFilter()
  const selectionHelperContext = useSelectionHelperContext()

  const currencyFilterValue = getFilterValue('currency')
  const bothCurrency =
    currencyFilterValue !== undefined &&
    currencyFilterValue.split(',').length > 1

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    currency:
      currencyFilterValue === '' || bothCurrency
        ? undefined
        : currencyFilterValue
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item style={{ maxHeight: 70 }}>
        <Filters />
      </Grid>
      <Grid item>
        <TableView<VirtualAccount>
          uri={virtualAccounts.getAll}
          name={virtualAccountQueryKeys.listAssigned}
          columns={columns}
          hasActions
          actions={Actions}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
          selectionHelper={selectionHelperContext}
        />
      </Grid>
    </Grid>
  )
}
