import {
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@material-ui/core'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'
import { BigCheckbox } from 'v2/app/components/BigCheckbox'

export interface BigCheckboxWithLabelProps
  extends Omit<FormControlLabelProps, 'control'> {}

export const BigCheckboxWithLabel = (
  props: BigCheckboxWithLabelProps & TypedFieldRenderComponentProps<boolean>
) => {
  const { name, value, label, error = true, control, ...rest } = props

  return (
    <FormControlLabel
      {...rest}
      checked={value}
      control={<BigCheckbox name={name} />}
      label={
        <Typography variant='body1' color={error ? 'error' : 'inherit'}>
          {label}
        </Typography>
      }
    />
  )
}
