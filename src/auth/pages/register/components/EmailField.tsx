import { InputAdornment, TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'
import { FocusButton } from 'auth/pages/register/components/FocusButton'
import { useInputFocus } from 'auth/pages/register/hooks/useInputFocus'

export interface EmailFieldProps {
  isMyInfo?: boolean
}

export const EmailField = ({ isMyInfo = false }: EmailFieldProps) => {
  const { control, errors } = useFormContext<SignupArgs>()
  const emailErrors = errors.email

  const { inputRef, handelInputFocus, inputDisabled } = useInputFocus()

  return (
    <TypedField
      control={control}
      component={TextField}
      name='email'
      label='Email'
      type='email'
      fullWidth
      placeholder='Email Address'
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        sx: isMyInfo
          ? {
              paddingRight: 0,
              input: {
                marginRight: '-45px'
              }
            }
          : null,
        inputRef: inputRef,
        endAdornment: !isMyInfo ? (
          emailErrors !== undefined ? (
            <InputAdornment position='end'>
              <WarningIcon />
            </InputAdornment>
          ) : null
        ) : (
          <FocusButton onClick={handelInputFocus} />
        )
      }}
      disabled={isMyInfo ? inputDisabled : false}
    />
  )
}
