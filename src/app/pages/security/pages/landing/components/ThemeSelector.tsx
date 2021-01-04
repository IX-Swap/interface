import { MenuItem, Select } from '@material-ui/core'
import { AppThemeContext } from 'AppThemeProvider'
import { AppTheme } from 'hooks/useAppTheme'
import React, { useContext } from 'react'

export const ThemeSelector = () => {
  const appTheme = useContext(AppThemeContext)

  if (appTheme === null || appTheme === undefined) {
    throw new Error('AppThemeContext must be used inside AppThemeProvider')
  }

  const { theme, onChange } = appTheme

  const handleChange = (event: any) => {
    onChange(event.target.value as AppTheme)
  }

  return (
    <Select value={theme} onChange={handleChange}>
      {Object.values(AppTheme).map(value => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  )
}
