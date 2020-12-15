import React from 'react'
import { Summary } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { Grid, Input } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'app/pages/accounts/types'
import { TypedField } from 'components/form/TypedField'
import { Submit } from 'components/form/Submit'
import { privateClassNames } from 'helpers/classnames'

export const Preview: React.FC = () => {
  const { control } = useFormContext<WithdrawDSFormValues>()

  return (
    <Grid container direction='column'>
      <Summary />
      <Grid item container direction='column'>
        <TypedField
          className={privateClassNames()}
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
