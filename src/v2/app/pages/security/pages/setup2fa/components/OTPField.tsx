import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { Enable2faFormValues } from 'v2/app/pages/security/pages/setup2fa/types'

export const OTPField = () => {
  const { control } = useFormContext<Enable2faFormValues>()

  return (
    <TypedField
      fullWidth
      control={control}
      component={Input}
      label='OTP'
      name='otp'
    />
  )
}
