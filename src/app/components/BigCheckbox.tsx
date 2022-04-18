import React from 'react'
import clsx from 'clsx'
import { CheckboxProps } from '@mui/material/Checkbox'
import useStyles from './BigCheckbox.styles'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'

export const BigCheckbox = (props: CheckboxProps) => {
  const classes = useStyles()

  return (
    <UICheckbox
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
