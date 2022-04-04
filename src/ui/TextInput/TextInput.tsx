import React from 'react'
import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import { useTheme } from '@mui/material/styles'

type InputProps = TextFieldProps & { loading?: boolean }

export const TextInput = (props: InputProps) => {
  const { children, loading = false, error, ...rest } = props
  const theme = useTheme()
  console.log(theme?.palette?.input?.placeholder)
  return (
    <TextField
      {...rest}
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
                <Icon name={error === false ? 'alert-triangle' : 'check'} />
              )}
            </InputAdornment>
          ) : null
      }}
    >
      {props?.children}
    </TextField>
  )
}
