import { Switch } from '@mui/material'
import { AppThemeContext } from 'AppThemeProvider'
import React, { useContext, useState } from 'react'
import { AppTheme } from 'themes/app'
import useStyles from './ThemeSelector.style'

export const ThemeSelectorMobile = () => {
  const appThemeContext = useContext(AppThemeContext)
  const [mode, setMode] = useState('Light')
  const classes = useStyles()

  if (appThemeContext === null || appThemeContext === undefined) {
    throw new Error('AppThemeContext must be used inside AppThemeProvider')
  }

  const { onChange } = appThemeContext

  const handleChange = (type: string) => {
    setMode(type)
    onChange(type as AppTheme)
  }

  return (
    <>
      <Switch
        className={classes.switchWrapper}
        checked={mode === 'Dark'}
        onChange={(_, checked) => {
          handleChange(checked ? 'Dark' : 'Light')
        }}
        name='type'
        color='primary'
      />
    </>
  )
}
ThemeSelectorMobile.displayName = 'Select_ThemeSelectorMobile'
