import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const OTCTrades = () => {
  return (
    <RootContainer>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader title='Authorize OTC Trades' />
        </Grid>
        <Grid item container>
          <Grid item></Grid>
        </Grid>
      </Grid>
    </RootContainer>
  )
}
