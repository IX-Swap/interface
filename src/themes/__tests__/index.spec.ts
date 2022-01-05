import { createTheme, Theme } from '@material-ui/core/styles'
import { lightTheme } from 'themes/light'
import { typography } from 'themes/typography'
import { getThemeOverrides } from 'themes/overrides'
import { AppTheme, getAppTheme } from 'themes'
import { darkTheme } from 'themes/dark'

jest.mock('@material-ui/core/styles', () => ({
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
