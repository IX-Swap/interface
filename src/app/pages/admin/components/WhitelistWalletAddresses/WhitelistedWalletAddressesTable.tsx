import React from 'react'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Grid } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { columns } from './columns'
import { issuanceURL } from 'config/apiURL'
import { issuanceQueryKeys } from 'config/queryKeys'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'

export const WhitelistedWalletAddressesTable = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <BaseFilters hideDateFilter />
      </Grid>
      <Grid item>
        <TableView
          uri={issuanceURL.whitelist.getWhitelistedAddresses}
          name={issuanceQueryKeys.getWhitelistedAddresses}
          columns={columns}
          filter={filter}
          paperProps={{ variant: 'elevation', elevation: 0 }}
        />
      </Grid>
    </Grid>
  )
}
