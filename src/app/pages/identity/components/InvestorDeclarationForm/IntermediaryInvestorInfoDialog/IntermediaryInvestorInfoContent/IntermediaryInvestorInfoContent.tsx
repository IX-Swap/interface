import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Divider } from 'ui/Divider'

export const IntermediaryInvestorInfoContent = () => {
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography color={'text.secondary'} fontWeight={500}>
          A person who has opened an intermediary account on the InvestaX
          Platform to trade on behalf of its customers and whose account is
          valid and subsisting (whether or not suspended) and is an
          Institutional Investor. The customers of such Intermediary Investor
          can only be an Accredited Investor or an Institutional Investor.
        </Typography>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  )
}
