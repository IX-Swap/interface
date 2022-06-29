import { TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { FocusButton } from 'auth/pages/register/components/FocusButton'
import { useInputFocus } from 'auth/pages/register/hooks/useInputFocus'

export interface PhoneFieldProps {
  isMyInfo?: boolean
}

export const PhoneField = ({ isMyInfo = false }: PhoneFieldProps) => {
  const { control } = useFormContext<SignupArgs>()

  const { inputRef, handelInputFocus, inputDisabled } = useInputFocus()

  return (
    <TypedField
      component={TextField}
      control={control}
      name='phoneNumber'
      label='Phone Number'
      customRenderer
      fullWidth
      InputProps={{
        inputRef: inputRef,
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
