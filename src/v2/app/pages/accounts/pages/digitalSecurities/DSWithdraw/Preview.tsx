import React from 'react'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { Grid, Input } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { TypedField } from 'v2/components/form/TypedField'
import { Submit } from 'v2/components/form/Submit'

export const Preview: React.FC = () => {
  const { control } = useFormContext<WithdrawDSFormValues>()

  return (
    <Grid container direction='column'>
      <Summary />
      <Grid item container direction='column'>
        <TypedField
          control={control}
          component={Input}
          name='otp'
          label='2-Factor Auth Code'
          autoComplete='off'
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
