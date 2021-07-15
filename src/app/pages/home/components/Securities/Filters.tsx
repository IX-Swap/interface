import { Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CountryFilter } from 'app/pages/home/components/Securities/CountryFilter'
import { IndustryFilter } from 'app/pages/home/components/Securities/IndustryFilter'
import { ProtocolFilter } from 'app/pages/home/components/Securities/ProtocolFilter'
import { SecurityTypeFilter } from 'app/pages/home/components/Securities/SecurityTypeFilter'
import React from 'react'

export const Filters = () => {
  return (
    <Grid container spacing={0} justify='space-between'>
      <Grid item xs={12} md={4}>
        <SearchFilter
          inputAdormentPosition='end'
          placeholder='Search'
          fullWidth
        />
      </Grid>
      <Grid
        xs={12}
        md={6}
        item
        container
        spacing={2}
        justify='flex-end'
        wrap='nowrap'
      >
        <Grid item>
          <IndustryFilter />
        </Grid>
        <Grid item>
          <SecurityTypeFilter />
        </Grid>
        <Grid item>
          <CountryFilter />
        </Grid>
        <Grid item>
          <ProtocolFilter />
        </Grid>
      </Grid>
    </Grid>
  )
}
