import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Actions } from 'app/pages/invest/components/SecondaryMarketTable/Actions'
import { DSOTableFilters } from 'app/pages/invest/components/DSOTable/DSOTableFilters'
import { exchange as exchangeURL } from 'config/apiURL'
import { columns } from 'app/pages/invest/components/SecondaryMarketTable/columns'

export const SecondaryMarketTable = () => {
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search', undefined)
  const capitalStructure = getFilterValue('capitalStructure', undefined)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        {/* TODO Change it after complete filter component */}
        <DSOTableFilters />
      </Grid>
      <Grid item>
        <TableView
          uri={exchangeURL.marketList}
          name={exchangeQueryKeys.marketList}
          columns={columns}
          hasActions
          actions={Actions}
          filter={{ search, capitalStructure }}
        />
      </Grid>
    </Grid>
  )
}
