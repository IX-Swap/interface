import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ReactComponent as AddCashAccountImage } from 'assets/add-cash-account.svg'
import { AddBankAccountButton } from '../../../withdraw/components/AddBankAccountButton'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'

export const NoData = () => {
  return (
    <Grid container flexDirection={'column'} pt={8}>
      <Grid item xs>
        <AddCashAccountImage />
      </Grid>
      <Grid item xs container flexDirection={'column'} spacing={3} pt={5}>
        <Grid item xs>
          <Typography variant='h5' align='center'>
            Add Cash Account
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body1'>
            You have no existing cash accounts yet.
          </Typography>
        </Grid>
        <Grid item xs>
          <TwoFADialogWrapper>
            <AddBankAccountButton variant={'contained'} />
          </TwoFADialogWrapper>
        </Grid>
      </Grid>
    </Grid>
  )
}
