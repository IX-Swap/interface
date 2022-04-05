import { createTheme, Theme } from '@mui/material/styles'
import { lightTheme } from 'themes/app/light'
import { typography } from 'themes/app/typography'
import { getThemeOverrides } from 'themes/app/overrides'
import { AppTheme, getAppTheme } from 'themes/app/index'
import { darkTheme } from 'themes/app/dark'

jest.mock('@mui/material/styles', () => ({
  createTheme: jest.fn()
}))

describe.skip('getAppTheme', () => {
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
