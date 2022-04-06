import React from 'react'
import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import { useTheme } from '@mui/material/styles'
import useStyles from './TextInput.styles'

type InputProps = TextFieldProps & { loading?: boolean }

export const TextInput = (props: InputProps) => {
  const { children, loading = false, disabled, error, name, ...rest } = props
  const theme = useTheme()
  const classes = useStyles()
  return (
    <TextField
      {...rest}
      InputLabelProps={{
        shrink: true
      }}
      name={name}
      error={error}
      disabled={disabled}
      className={disabled === true ? classes.disabled : ''}
      sx={{
        marginTop:
          (rest?.variant ?? 'outlined') === 'outlined' ? '12px' : 'initial'
      }}
      InputProps={{
        endAdornment:
          loading || error !== undefined ? (
            <InputAdornment position='end'>
              {loading && (
                <CircularProgress
                  thickness={1.5}
                  style={{ color: theme?.palette?.input?.placeholder }}
                  size={13}
                />
              )}
              {!loading && (
                <Icon
                  name={error === true ? 'alert-triangle' : 'check'}
                  noHover
                  size={15}
                  color={
                    error === true
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                />
              )}
            </InputAdornment>
          ) : null
      }}
    >
      {props?.children}
    </TextField>
  )
}

TextInput.displayName = 'TextInput'
