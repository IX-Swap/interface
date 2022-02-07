import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Input } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Enable2faFormValues } from 'app/pages/security/pages/setup2fa/types'

export const OTPField = () => {
  const { control } = useFormContext<Enable2faFormValues>()

  return (
    <TypedField
      fullWidth
      control={control}
      component={Input}
      label='OTP'
      name='otp'
      autoComplete='off'
    />
  )
}
