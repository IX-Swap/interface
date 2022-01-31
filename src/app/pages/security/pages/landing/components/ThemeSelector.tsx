import { MenuItem, Select } from '@material-ui/core'
import { AppThemeContext } from 'AppThemeProvider'
import React, { ChangeEvent, useContext } from 'react'
import { AppTheme } from 'themes/old'
import useStyles from './ThemeSelector.style'

export const ThemeSelector = () => {
  const appThemeContext = useContext(AppThemeContext)
  const classes = useStyles()

  if (appThemeContext === null || appThemeContext === undefined) {
    throw new Error('AppThemeContext must be used inside AppThemeProvider')
  }

  const { onChange, themeType } = appThemeContext

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
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
        <MenuItem key={value} value={value}>
          {value} Theme
        </MenuItem>
      ))}
    </Select>
  )
}
