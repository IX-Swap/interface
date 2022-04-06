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
  const {
    children,
    loading = false,
    InputProps,
    disabled,
    error,
    name,
    value,
    ...rest
  } = props
  const theme = useTheme()
  const classes = useStyles()
  const hasError = Boolean(
    error === undefined || !error ? InputProps?.error ?? error : error
  )
  return (
    <TextField
      {...rest}
      InputLabelProps={{
        shrink: true
      }}
      name={name}
      error={hasError}
      value={value}
      disabled={disabled}
      className={disabled === true ? classes.disabled : ''}
      sx={{
        marginTop:
          (rest?.variant ?? 'outlined') === 'outlined' ? '12px' : 'initial'
      }}
      InputProps={{
        endAdornment:
          loading || hasError !== undefined ? (
            <InputAdornment position='end'>
              {loading && (
                <CircularProgress
                  thickness={1.5}
                  style={{ color: theme?.palette?.input?.placeholder }}
                  size={13}
                />
              )}
              {!loading && hasError && (
                <Icon
                  name={'alert-triangle'}
                  noHover
                  size={15}
                  color={theme.palette.error.main}
                />
              )}
              {!loading &&
                !hasError &&
                (value === undefined ? null : (
                  <Icon
                    name={'check'}
                    noHover
                    size={15}
                    color={theme.palette.success.main}
                  />
                ))}
            </InputAdornment>
          ) : null,
        ...InputProps
      }}
    >
      {props?.children}
    </TextField>
  )
}

TextInput.displayName = 'TextInput'
