import { Grid } from '@material-ui/core'
import { Filters } from 'app/pages/home/components/Securities/Filters'
import React from 'react'

export const Securities = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Filters />
      </Grid>
    </Grid>
  )
}
