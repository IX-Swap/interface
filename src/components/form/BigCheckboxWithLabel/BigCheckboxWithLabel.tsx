import {
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { BigCheckbox } from 'app/components/BigCheckbox'
import useStyles from './BigCheckboxWithLabel.styles'

export interface BigCheckboxWithLabelProps
  extends Omit<FormControlLabelProps, 'control'> {}

export const BigCheckboxWithLabel = (
  props: BigCheckboxWithLabelProps & TypedFieldRenderComponentProps<boolean>
) => {
  const { name, value, label, error = true, control, ...rest } = props
  const classes = useStyles()

  return (
    <FormControlLabel
      {...rest}
      checked={value}
      control={<BigCheckbox name={name} />}
      label={
        <Typography
          variant='body1'
          color={error ? 'error' : 'inherit'}
          className={classes.text}
        >
          {label}
        </Typography>
      }
    />
  )
}
