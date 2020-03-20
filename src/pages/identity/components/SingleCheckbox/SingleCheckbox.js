import React from 'react'
import { FormControl, FormHelperText, Checkbox, FormControlLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function SelectGroup(props) {
  const { options, label, error, helperText, required, ...controllerProps } = props

  return (
    <FormControl component='fieldset' margin='dense' fullWidth error={!!error} required={required}>

      <FormControlLabel
        label={label}
        control={
          <Controller
            as={Checkbox}
            {...controllerProps}
          />
        }
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
