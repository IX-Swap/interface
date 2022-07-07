import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { FocusButton } from 'auth/pages/register/components/FocusButton'
import { useInputFocus } from 'auth/pages/register/hooks/useInputFocus'
import { PhoneInput } from 'components/form/PhoneInput'
import { plainValueExtractor } from 'helpers/forms'

export const PhoneField = () => {
  const { control } = useFormContext<SignupArgs>()

  const { handelInputFocus, inputDisabled } = useInputFocus()

  return (
    <TypedField
      component={PhoneInput}
      control={control}
      name='phoneNumber'
      label='Phone Number'
      valueExtractor={plainValueExtractor}
      fullWidth
      defaultValue={''}
      InputProps={{
        sx: {
          paddingRight: 0,
          input: {
            marginRight: '-45px'
          }
        },
        endAdornment: <FocusButton onClick={handelInputFocus} />
      }}
      disabled={inputDisabled}
    />
  )
}
