import { Grid } from '@mui/material'
import { StatusFilter } from 'app/pages/issuance/components/DSOFilters/StatusFilter'
import { SubFundSelect } from 'app/pages/issuance/components/DSOFilters/SubFundSelect'
import React from 'react'

export const DSOFilters = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <StatusFilter />
      </Grid>
      <Grid item>
        <SubFundSelect />
      </Grid>
    </Grid>
  )
}
