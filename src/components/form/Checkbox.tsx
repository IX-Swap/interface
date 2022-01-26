import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@material-ui/core'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { ReactComponent as SuccessIcon } from 'assets/icons/success_icon.svg'

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  reverse?: boolean
  withNewSuccessIcon?: boolean
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
    withNewSuccessIcon = false,
    ...rest
  } = props

  return (
    <FormControlLabel
      {...rest}
      style={{
        alignItems: 'flex-start'
      }}
      checked={reverse ? !value : value}
      control={
        <MUICheckbox
          name={name}
          checkedIcon={withNewSuccessIcon ? <SuccessIcon /> : undefined}
        />
      }
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
