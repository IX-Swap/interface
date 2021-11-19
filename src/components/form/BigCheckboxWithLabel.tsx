import {
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@material-ui/core'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { BigCheckbox } from 'app/components/BigCheckbox'

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
        <Typography
          variant='body1'
          color={error ? 'error' : 'inherit'}
          style={{ position: 'relative', top: 13, fontSize: 16 }}
        >
          {label}
        </Typography>
      }
    />
  )
}
