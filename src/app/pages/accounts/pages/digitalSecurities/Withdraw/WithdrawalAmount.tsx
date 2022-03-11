import { Box, Grid, Typography } from '@mui/material'
import { AmountField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AmountField'
import { MemoField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/MemoField'
import { Warning } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Warning'
import React from 'react'

export const WithdrawalAmount = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant='body1' align='right'>
          <Box component='span' fontWeight='bold'>
            Withdrawal Amount:
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AmountField />
          </Grid>
          <Grid item xs={12}>
            <MemoField />
          </Grid>
          <Grid item xs={12}>
            <Warning />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
