import { IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import { useStyles } from 'components/form/PasswordField.styles'
import { ReactComponent as EyeIcon } from 'assets/icons/new/eye.svg'
import { ReactComponent as EyeOffIcon } from 'assets/icons/new/eye-off.svg'

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
  const { showPasswordButton } = useStyles({ hasErrors })
  const Icon = inputType === 'password' ? EyeIcon : EyeOffIcon

  return (
    <InputAdornment position={'end'}>
      <IconButton
        disableTouchRipple
        className={showPasswordButton}
        onClick={() => setType(inputType === 'password' ? 'text' : 'password')}
      >
        <Icon />
      </IconButton>
    </InputAdornment>
  )
}
