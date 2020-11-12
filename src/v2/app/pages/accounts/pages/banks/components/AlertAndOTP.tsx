import React, { createElement, ElementType } from 'react'
import { Grid, Input } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { TypedField } from 'v2/components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { privateClassNames } from 'v2/helpers/classnames'

export interface AlertAndOTPProps {
  alert: ElementType
}

export const AlertAndOTP = (props: AlertAndOTPProps) => {
  const { alert } = props
  const { control } = useFormContext<DepositCashFormValues>()

  return (
    <Grid item container justify='center' className={privateClassNames()}>
      {createElement(alert)}
      <Grid item container direction='column' xs={12}>
        <VSpacer size='small' />
        <TypedField
          control={control}
          component={Input}
          name='otp'
          label='2-Factor Auth Code'
          inputProps={{
            autoComplete: 'off'
          }}
        />
        <VSpacer size='small' />
      </Grid>
    </Grid>
  )
}
