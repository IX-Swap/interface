import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { FocusButton } from 'auth/pages/register/components/FocusButton'
import { useInputFocus } from 'auth/pages/register/hooks/useInputFocus'
import { PhoneInput } from 'components/form/PhoneInput'
import { plainValueExtractor } from 'helpers/forms'

export interface MobileFieldProps {
  isMyInfo?: boolean
}

export const PhoneField = ({ isMyInfo = false }: MobileFieldProps) => {
  const { control } = useFormContext<SignupArgs>()

  const {
    // ! Temporarily commented out. Causes white screen issue in SingPass sign-ups. See https://investax.atlassian.net/browse/IPD1-1741
    // inputRef,
    inputDisabled,
    handelInputFocus
  } = useInputFocus()

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
        // inputRef: inputRef,
        endAdornment: <FocusButton onClick={handelInputFocus} />
      }}
      disabled={isMyInfo ? inputDisabled : false}
    />
  )
}
