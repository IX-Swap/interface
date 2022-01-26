import { createTheme, Theme } from '@mui/material/styles'
import { lightTheme } from 'themes/old/light'
import { typography } from 'themes/old/typography'
import { getThemeOverrides } from 'themes/old/overrides'
import { AppTheme, getAppTheme } from 'themes/old/index'
import { darkTheme } from 'themes/old/dark'

jest.mock('@mui/material/styles', () => ({
  createTheme: jest.fn()
}))

describe('getAppTheme', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls createMuiTheme with correct arguments for the light theme', () => {
    getAppTheme(AppTheme.Light, true)

    expect(createTheme).toHaveBeenCalledWith({
      ...lightTheme,
      typography,
      overrides: getThemeOverrides(lightTheme as Theme)
    })
  })

  it('calls createMuiTheme with correct arguments for the dark theme', () => {
    getAppTheme(AppTheme.Dark, true)

    expect(createTheme).toHaveBeenCalledWith({
      ...darkTheme,
      typography,
      overrides: getThemeOverrides(darkTheme as Theme)
    })
  })

  it('calls createMuiTheme with correct arguments for the system theme if user prefers dark mode', () => {
    getAppTheme(AppTheme.System, true)

    expect(createTheme).toHaveBeenCalledWith({
      ...darkTheme,
      typography,
      overrides: getThemeOverrides(darkTheme as Theme)
    })
  })

  it('calls createMuiTheme with correct arguments for the system theme if user prefers dark mode', () => {
    getAppTheme(AppTheme.System, false)

    expect(createTheme).toHaveBeenCalledWith({
      ...lightTheme,
      typography,
      overrides: getThemeOverrides(lightTheme as Theme)
    })
  })
})
