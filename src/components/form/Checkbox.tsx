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
  labelClassName?: string
}

export const Checkbox = (
  props: CheckboxProps & TypedFieldRenderComponentProps<boolean>
) => {
  const {
    name,
    value,
    label,
    labelClassName = '',
    error = true,
    control,
    reverse = false,
    ...rest
  } = props

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
          color={error ? 'error' : 'inherit'}
          style={{ marginTop: 10, fontSize: 13.5 }}
          className={labelClassName}
        >
          {label}
        </Typography>
      }
    />
  )
}
