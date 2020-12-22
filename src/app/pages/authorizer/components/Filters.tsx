import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'

export const Filters = () => {
  return (
    <Grid container spacing={3} style={{ paddingTop: 70 }}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='h6'>FILTERS</Typography>
      </Grid>
      <Grid item xs={12}>
        <StatusFilter />
      </Grid>
      <SearchAndDateFilter />
    </Grid>
  )
}
