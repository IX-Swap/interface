import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { plainValueExtractor } from 'helpers/forms'
import { OTPInputField } from 'ui/OTPInputField/OTPInputField'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Typography } from '@mui/material'

export const OTPFIeld = () => {
  const { control } = useFormContext()
  return (
    <>
      <InputLabel>
        OTP
        <Typography variant='caption' color='#778194' sx={{ opacity: 1 }}>
          (code from your authenticator)
        </Typography>
      </InputLabel>

      <TypedField
        isInputNum
        control={control}
        component={OTPInputField}
        name='otp'
        label='OTP'
        variant='outlined'
        valueExtractor={plainValueExtractor}
        numInputs={6}
        size='small'
      />
    </>
  )
}
