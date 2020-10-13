import React from 'react'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { useDSWithdrawForm } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'

export const Preview: React.FC = () => {
  const { TextField, Submit } = useDSWithdrawForm()

  return (
    <Grid container direction='column'>
      <Summary />
      <Grid item container direction='column'>
        <TextField
          name='otp'
          label='2-Factor Auth Code'
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            autoComplete: 'off'
          }}
        />
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item container justify='center'>
        <Submit fullWidth>Confirm Withdraw</Submit>
      </Grid>
    </Grid>
  )
}
