import {
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'

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

  const getColor = () => {
    if (error) {
      return 'error'
    }
    if (value) {
      return reverse ? 'text.secondary' : 'text.primary'
    }

    return reverse ? 'text.primary' : 'text.secondary'
  }

  return (
    <FormControlLabel
      {...rest}
      style={{
        alignItems: 'flex-start',
        ...props.style
      }}
      checked={reverse ? !value : value}
      control={<UICheckbox name={name} />}
      label={
        <Typography
          fontWeight={400}
          variant='body1'
          color={getColor()}
          style={{ marginTop: 8, fontSize: 14, lineHeight: 1.5 }}
        >
          {label}
        </Typography>
      }
    />
  )
}
