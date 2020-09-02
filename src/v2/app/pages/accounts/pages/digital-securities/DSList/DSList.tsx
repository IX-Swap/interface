import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { DSTable } from 'v2/app/pages/accounts/pages/digital-securities/DSList/DSTable'

export const DSList: React.FC = () => {
  return (
    <Grid container component={Paper} spacing={4} direction='column'>
      <Grid item>
        <DSTable />
      </Grid>
    </Grid>
  )
}
