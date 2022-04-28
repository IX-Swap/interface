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
import classnames from 'classnames'

type InputProps = TextFieldProps & { loading?: boolean; hideIcon?: boolean }

export const TextInput = (props: InputProps) => {
  const {
    children,
    loading = false,
    InputProps,
    disabled,
    error,
    name,
    value,
    hideIcon = false,
    ...rest
  } = props
  const theme = useTheme()
  const classes = useStyles()
  // For testing purposes. If the field has no error. Take it from input props
  const hasError = Boolean(
    error === undefined || !error ? InputProps?.error ?? error : error
  )
  const inputIsEmpty = value === undefined || value === null || value === ''

  return (
    <TextField
      {...rest}
      name={name}
      error={hasError}
      value={value}
      disabled={disabled}
      className={
        disabled === true
          ? classnames(classes.root, classes.disabled)
          : classes.root
      }
      InputProps={{
        endAdornment:
          !hideIcon && (loading || hasError !== undefined) ? (
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
                (inputIsEmpty ? null : (
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

TextInput.displayName = 'TextField_TextInput'
