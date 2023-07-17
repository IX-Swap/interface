import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { FocusButton } from 'auth/pages/register/components/FocusButton'
import { useInputFocus } from 'auth/pages/register/hooks/useInputFocus'
import { PhoneInput } from 'components/form/PhoneInput'
import { plainValueExtractor } from 'helpers/forms'
// import { FocusButton } from './FocusButton'

export interface MobileFieldProps {
  isMyInfo?: boolean
}

export const PhoneField = ({ isMyInfo = false }: MobileFieldProps) => {
  const { control } = useFormContext<SignupArgs>()

  const { inputRef, inputDisabled, handelInputFocus } = useInputFocus()

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
        inputRef: inputRef,
        endAdornment: <FocusButton onClick={handelInputFocus} />
      }}
      disabled={isMyInfo ? inputDisabled : false}
    />
  )
}
