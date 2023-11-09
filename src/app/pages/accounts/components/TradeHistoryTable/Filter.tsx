import { Grid } from '@mui/material'
import { PairFilter } from 'app/pages/accounts/components/TradeHistoryTable/PairFilter'
import React from 'react'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'
import { ExportButton } from 'ui/ExportButton/ExportButton'

export const Filters = () => {
  return (
    <BaseFilters>
      <Grid item xs>
        <PairFilter />
      </Grid>
      <Grid item xs>
        <ExportButton fullWidth />
      </Grid>
    </BaseFilters>
  )
}
