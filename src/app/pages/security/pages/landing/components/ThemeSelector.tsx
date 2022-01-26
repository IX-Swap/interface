import { MenuItem, Select } from '@mui/material'
import { AppThemeContext } from 'AppThemeProvider'
import React, { ChangeEvent, useContext } from 'react'
import { AppTheme } from 'themes/old'

export const ThemeSelector = () => {
  const appThemeContext = useContext(AppThemeContext)

  if (appThemeContext === null || appThemeContext === undefined) {
    throw new Error('AppThemeContext must be used inside AppThemeProvider')
  }

  const { onChange, themeType } = appThemeContext

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as AppTheme)
  }

  return (
    <Select value={themeType} onChange={handleChange} variant='outlined'>
      {Object.values(AppTheme).map(value => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  )
}
