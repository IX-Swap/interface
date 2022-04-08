import React from 'react'
import { MenuItem, MenuItemProps } from '@mui/material'
import { useStyles } from './SelectItem.styles'
import classNames from 'classnames'

export interface SelectMenuItem extends MenuItemProps {
  withCheckbox?: boolean
}
export const SelectItem = ({
  withCheckbox = false,
  ...props
}: SelectMenuItem) => {
  const classes = useStyles()

  return (
    <MenuItem
      {...props}
      className={classNames(classes.wrapper, {
        [classes.multiple]: withCheckbox
      })}
    />
  )
}
