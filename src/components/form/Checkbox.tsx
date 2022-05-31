import {
  FormControlLabel,
  FormControlLabelProps,
  Typography,
  useTheme
} from '@mui/material'
import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { useStyles } from 'components/form/Checkbox.styles'

export interface CheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  reverse?: boolean
  labelColor?: string
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
    labelColor,
    ...rest
  } = props
  const theme = useTheme()

  const classes = useStyles()
  const defaultColor = error
    ? 'error'
    : labelColor != null
    ? labelColor
    : value
    ? theme.palette.text.primary
    : theme.palette.text.secondary

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
          color={defaultColor}
          style={{ marginTop: 10, fontSize: 13.5 }}
        >
          {label}
        </Typography>
      }
    />
  )
}
