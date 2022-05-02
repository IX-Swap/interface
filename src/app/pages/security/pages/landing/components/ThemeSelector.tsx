import { SelectChangeEvent } from '@mui/material'
import { AppThemeContext } from 'AppThemeProvider'
import React, { useContext } from 'react'
import { AppTheme } from 'themes/app'
import useStyles from './ThemeSelector.style'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const ThemeSelector = () => {
  const appThemeContext = useContext(AppThemeContext)
  const classes = useStyles()

  if (appThemeContext === null || appThemeContext === undefined) {
    throw new Error('AppThemeContext must be used inside AppThemeProvider')
  }

  const { onChange, themeType } = appThemeContext

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as AppTheme)
  }

  return (
    <Select
      value={themeType}
      onChange={handleChange}
      variant='outlined'
      className={classes.wrapper}
    >
      {Object.values(AppTheme).map(value => (
        <SelectItem key={value} value={value}>
          {value} Theme
        </SelectItem>
      ))}
    </Select>
  )
}
ThemeSelector.displayName = 'Select_ThemeSelector'
