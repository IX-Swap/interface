import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ReactComponent as AddCashAccountImage } from 'assets/add-cash-account.svg'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { capitalize } from 'lodash'

export const NoData = ({ accountType = 'bank', children = <></> }) => {
  return (
    <Grid container flexDirection={'column'} pt={8}>
      <Grid item xs>
        <AddCashAccountImage />
      </Grid>
      <Grid item xs container flexDirection={'column'} spacing={3} pt={5}>
        <Grid item xs>
          <Typography variant='h5' align='center'>
            Add {capitalize(accountType)} Account
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body1'>
            You have no existing {accountType} accounts yet.
          </Typography>
        </Grid>
        <Grid item xs>
          <TwoFADialogWrapper>{children}</TwoFADialogWrapper>
        </Grid>
      </Grid>
    </Grid>
  )
}
