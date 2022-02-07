import React, { createElement, ElementType } from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'app/pages/accounts/types'
import { privateClassNames } from 'helpers/classnames'
import { OTPField } from 'components/form/OTPField'
import { plainValueExtractor } from 'helpers/forms'

export interface AlertAndOTPProps {
  alert: ElementType
}

export const AlertAndOTP = (props: AlertAndOTPProps) => {
  const { alert } = props
  const { control } = useFormContext<DepositCashFormValues>()

  return (
    <Grid
      item
      container
      justifyContent='center'
      className={privateClassNames()}
    >
      {createElement(alert)}
      <Grid item container direction='column' xs={12}>
        <VSpacer size='small' />
        <TypedField
          control={control}
          customRenderer
          component={OTPField}
          name='otp'
          label='2-Factor Auth Code'
          variant='outlined'
          valueExtractor={plainValueExtractor}
          shouldAutoFocus
        />
        <VSpacer size='small' />
      </Grid>
    </Grid>
  )
}
