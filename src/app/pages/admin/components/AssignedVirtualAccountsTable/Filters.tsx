import { Grid } from '@mui/material'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import React from 'react'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'

export const Filters = () => {
  return (
    <BaseFilters searchLabel='Search by Virtual Account'>
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
