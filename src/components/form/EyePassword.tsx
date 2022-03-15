import { IconButton, InputAdornment, useTheme } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'components/form/PasswordField.styles'
interface EyePasswordProps {
  inputType?: 'text' | 'password'
  hasErrors?: boolean
  setType: (type: 'text' | 'password') => void
}
export const EyePassword = ({
  inputType = 'password',
  hasErrors = false,
  setType
}: EyePasswordProps) => {
  const { showPasswordButton } = useStyles()
  const theme = useTheme()
  const errorColor = hasErrors ? theme.palette.error.main : undefined
  return (
    <InputAdornment position={'end'}>
      <IconButton
        className={showPasswordButton}
        onClick={() => setType(inputType === 'password' ? 'text' : 'password')}
      >
        <Icon
          name={inputType === 'password' ? 'eye' : 'eye-off'}
          color={errorColor}
          hoverColor={errorColor}
        />
      </IconButton>
    </InputAdornment>
  )
}
