import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'
import { VirtualAccount } from 'types/virtualAccount'
import { Filters } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Filters'
import { Grid } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const UnassignedAccountsTable: React.FC = () => {
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
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
