import React from 'react'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { useDSWithdrawForm } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { Box, Grid } from '@material-ui/core'

export const Preview: React.FC = () => {
  const { TextField, Submit } = useDSWithdrawForm()

  return (
    <>
      <Summary />
      <Grid item container direction='column'>
        <Box my={4} alignSelf='center'>
          <TextField
            name='otp'
            label='2-Factor Auth Code'
            inputProps={{
              autoComplete: 'off'
            }}
          />
        </Box>
      </Grid>
      <Submit>Confirm Withdraw</Submit>
    </>
  )
}
