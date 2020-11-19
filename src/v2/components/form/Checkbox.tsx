import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@material-ui/core'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {}

export const Checkbox = (
  props: CheckboxProps & TypedFieldRenderComponentProps<boolean>
) => {
  const { name, value, label, error = true, control, ...rest } = props

  return (
    <FormControlLabel
      {...rest}
      checked={value}
      control={<MUICheckbox name={name} />}
      label={
        <Typography variant='body1' color={error ? 'error' : 'inherit'}>
          {label}
        </Typography>
      }
    />
  )
}
