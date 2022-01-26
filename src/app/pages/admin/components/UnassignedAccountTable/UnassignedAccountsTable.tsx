import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/admin/components/UnassignedAccountTable/Actions'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'
import { VirtualAccount } from 'types/virtualAccount'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { Filters } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Filters'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useUnmountCallback } from 'hooks/useUnmountCallback'

export const UnassignedAccountsTable: React.FC = () => {
  const selectionHelperContext = useSelectionHelperContext<
    VirtualAccount | unknown
  >()
  useUnmountCallback(selectionHelperContext.resetSelection)
  const { getFilterValue } = useQueryFilter()

  const currencyFilterValue = getFilterValue('currency')
  const bothCurrency =
    currencyFilterValue !== undefined &&
    currencyFilterValue.split(',').length > 1

  const filter = {
    isAssigned: false,
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
          uri={`/virtual-accounts/list`}
          name={virtualAccountQueryKeys.listUnassigned}
          columns={columns}
          hasActions
          actions={Actions}
          selectionHelper={selectionHelperContext}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
