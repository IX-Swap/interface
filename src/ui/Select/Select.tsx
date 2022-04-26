import React from 'react'
import {
  Box,
  Select as MuiSelect,
  SelectProps as MuiSelectProps
} from '@mui/material'
import { useStyles } from './Select.styles'

export interface SelectProps extends MuiSelectProps {}

export const Select = ({
  multiple = false,
  MenuProps,
  ...props
}: SelectProps) => {
  const classes = useStyles()

  const renderValue = (selected: any | any[]) => {
    const isPlaceholderVisible = multiple
      ? selected.length === 0
      : selected === null || selected === undefined

    if (isPlaceholderVisible) {
      return <Box className={classes.placeholder}>{props.placeholder}</Box>
    }

    if (multiple) {
      return selected.join(', ')
    }

    return selected
  }

  return (
    <MuiSelect
      {...props}
      renderValue={renderValue}
      fullWidth
      multiple={multiple}
      className={classes.wrapper}
      classes={{ select: classes.select }}
      MenuProps={{
        classes: { list: classes.list, paper: classes.paper },
        ...MenuProps
      }}
    />
  )
}
