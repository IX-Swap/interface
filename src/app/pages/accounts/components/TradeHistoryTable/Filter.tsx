import { Grid } from '@mui/material'
import { PairFilter } from 'app/pages/accounts/components/TradeHistoryTable/PairFilter'
import React from 'react'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'

export const Filters = () => {
  return (
    <BaseFilters>
      <Grid item>
        <PairFilter />
      </Grid>
    </BaseFilters>
  )
}
