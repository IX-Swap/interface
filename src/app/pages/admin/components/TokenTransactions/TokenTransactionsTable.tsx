import React from 'react'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from 'app/pages/admin/components/TokenTransactions/columns'
import { ledgerURL } from 'config/apiURL'
import { ledgerQueryKeys } from 'config/queryKeys'
import { SourceFilter } from 'app/pages/admin/components/TokenTransactions/SourceFilter'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'

export const TokenTransactionsTable = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    pair: getFilterValue('pair'),
    source: getFilterValue('tokenTransactionSource')
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <BaseFilters>
          <Grid item xs>
            <SourceFilter />
          </Grid>
        </BaseFilters>
      </Grid>
      <Grid item>
        <TableView
          uri={ledgerURL.getTokenTransactions}
          name={ledgerQueryKeys.getTokenTransactions}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
