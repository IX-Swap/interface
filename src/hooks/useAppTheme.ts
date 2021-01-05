import { useMediaQuery } from '@material-ui/core'
import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { useMemo, useState } from 'react'
import storageService from 'services/storage'
import { darkTheme } from 'themes/dark'
import { lightTheme } from 'themes/light'
import { getThemeOverrides } from 'themes/overrides'
import { typography } from 'themes/typography'

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System'
}

export const useAppTheme = () => {
  const savedTheme = storageService.get('app-theme', AppTheme.Light) as AppTheme
  const [themeType, setThemeType] = useState(savedTheme)

  const handelThemeChange = (themeType: AppTheme) => {
    setThemeType(themeType)
    storageService.set('app-theme', themeType)
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const baseTheme =
    themeType === AppTheme.System
      ? prefersDarkMode
        ? darkTheme
        : lightTheme
      : savedTheme === AppTheme.Dark
      ? darkTheme
      : lightTheme
  const themeMemo = useMemo(
    () =>
      createMuiTheme({
        ...baseTheme,
        typography,
        overrides: getThemeOverrides(baseTheme as Theme)
      }),
    [themeType, prefersDarkMode] // eslint-disable-line
  )

  return {
    themeType,
    theme: themeMemo,
    onChange: handelThemeChange
  }
}
