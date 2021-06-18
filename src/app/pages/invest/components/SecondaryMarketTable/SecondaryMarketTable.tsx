import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Actions } from 'app/pages/invest/components/SecondaryMarketTable/Actions'
import { exchange as exchangeURL } from 'config/apiURL'
import { columns } from 'app/pages/invest/components/SecondaryMarketTable/columns'
import { SearchFilter } from 'app/components/SearchFilter'

export const SecondaryMarketTable = () => {
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search', undefined)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justify={'space-between'}>
        <Grid item xs={3}>
          <SearchFilter
            fullWidth
            inputAdormentPosition='end'
            placeholder='Search'
          />
        </Grid>
        <Grid item />
      </Grid>
      <Grid item>
        <TableView
          uri={exchangeURL.marketList}
          name={exchangeQueryKeys.marketList}
          columns={columns}
          hasActions
          actions={Actions}
          filter={{ search } as any}
        />
      </Grid>
    </Grid>
  )
}
