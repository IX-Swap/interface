import { useMediaQuery } from '@mui/material'
import { useMemo, useState } from 'react'
import storageService from 'services/storage'
import { AppTheme, getAppTheme } from 'themes/old'

export const useAppTheme = () => {
  const savedTheme = storageService.get('app-theme', AppTheme.Light) as AppTheme
  const [themeType, setThemeType] = useState(savedTheme)

  const handelThemeChange = (themeType: AppTheme) => {
    setThemeType(themeType)
    storageService.set('app-theme', themeType)
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeMemo = useMemo(
    () => getAppTheme(themeType, prefersDarkMode),
    [themeType, prefersDarkMode] // eslint-disable-line
  )

  return {
    themeType,
    theme: themeMemo,
    onChange: handelThemeChange
  }
}
