import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  reverse?: boolean
}

export const Checkbox = (
  props: CheckboxProps & TypedFieldRenderComponentProps<boolean>
) => {
  const {
    name,
    value,
    label,
    error = true,
    control,
    reverse = false,
    ...rest
  } = props

  return (
    <FormControlLabel
      {...rest}
      style={{
        alignItems: 'flex-start'
      }}
      checked={reverse ? !value : value}
      control={<MUICheckbox name={name} />}
      label={
        <Typography
          variant='body1'
          color={error ? 'error' : 'inherit'}
          style={{ marginTop: 10 }}
        >
          {label}
        </Typography>
      }
    />
  )
}
