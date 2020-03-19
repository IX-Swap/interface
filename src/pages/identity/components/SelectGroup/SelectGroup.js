import React from 'react'
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function SelectGroup(props) {
  const { options, label, error, helperText, required, ...controllerProps } = props
  const { name } = controllerProps

  return (
    <FormControl margin='dense' fullWidth error={!!error} required={required}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        fullWidth
        labelId={`${name}-label`}
        as={
          <Select>
            {options.map(({ value, label }) =>
              <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </Select>
        }
        {...controllerProps}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
