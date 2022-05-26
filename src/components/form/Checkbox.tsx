import {
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { useStyles } from 'components/form/Checkbox.styles'

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

  const classes = useStyles()

  return (
    <FormControlLabel
      {...rest}
      style={{
        alignItems: 'flex-start',
        ...props.style
      }}
      checked={reverse ? !value : value}
      control={<UICheckbox className={classes.checkboxStyled} name={name} />}
      label={
        <Typography
          fontWeight={400}
          variant='body1'
          color={error ? 'error' : 'inherit'}
          style={{ marginTop: 10, fontSize: 13.5 }}
        >
          {label}
        </Typography>
      }
    />
  )
}
