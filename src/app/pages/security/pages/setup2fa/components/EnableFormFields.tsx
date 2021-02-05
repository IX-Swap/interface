import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { useFormContext } from 'react-hook-form'
import { plainValueExtractor } from 'helpers/forms'

export const EnableFormFields = () => {
  const { control } = useFormContext()

  return (
    <TypedField
      control={control}
      customRenderer
      component={OTPField}
      name='otp'
      label=''
      variant='standard'
      valueExtractor={plainValueExtractor}
      shouldAutoFocus
    />
  )
}
