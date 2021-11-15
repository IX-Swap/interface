import { Grid } from '@material-ui/core'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import React from 'react'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'

export const Filters = () => {
  return (
    <BaseFilters>
      <>
        <Grid item>
          <CurrencyFilter currency='SGD' />
        </Grid>
        <Grid item>
          <CurrencyFilter currency='USD' />
        </Grid>
      </>
    </BaseFilters>
  )
}
