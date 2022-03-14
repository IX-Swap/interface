import { IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'components/form/PasswordField.styles'
interface EyePasswordProps {
  inputType?: 'text' | 'password'
  setType: (type: 'text' | 'password') => void
}
export const EyePassword = ({
  inputType = 'password',
  setType
}: EyePasswordProps) => {
  const { showPasswordButton } = useStyles()

  return (
    <InputAdornment position={'end'}>
      <IconButton
        className={showPasswordButton}
        onClick={() => setType(inputType === 'password' ? 'text' : 'password')}
      >
        <Icon name={inputType === 'password' ? 'eye' : 'eye-off'} />
      </IconButton>
    </InputAdornment>
  )
}
