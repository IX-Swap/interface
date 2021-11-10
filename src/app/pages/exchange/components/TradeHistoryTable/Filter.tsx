import { Grid } from '@material-ui/core'
import { PairFilter } from 'app/pages/exchange/components/TradeHistoryTable/PairFilter'
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
