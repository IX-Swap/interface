import React from 'react'
import clsx from 'clsx'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import useStyles from './BigCheckbox.styles'

export const BigCheckbox = (props: CheckboxProps) => {
  const classes = useStyles()

  return (
    <Checkbox
      {...props}
      className={classes.root}
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox', ...props.inputProps }}
    />
  )
}
