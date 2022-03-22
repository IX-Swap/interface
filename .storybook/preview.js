import React from 'react'
import { Router } from 'react-router-dom'
import { history } from '../src/config/history'
import { ThemeProvider } from '@mui/material/styles'
import StylesProvider from '@mui/styles/StylesProvider'
import { createGenerateClassName } from '@mui/styles'
import { ServicesProvider } from '../src/hooks/useServices'
import { BreadcrumbsProvider } from '../src/hooks/useBreadcrumbs'
import { ToastProvider } from 'react-toast-notifications'
import { AppStateProvider } from '../src/app/hooks/useAppState'
import { Toast } from '../src/components/Toast'
import { AppThemeProvider } from '../src/AppThemeProvider'
import { themes } from '@storybook/theming'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    dark: {
      ...themes.normal,
      appContentBg: '#183061'
    },
    light: { ...themes.normal }
  }
}

export const decorators = [
  Story => (
    <StylesProvider generateClassName={generateClassName}>
      <AppThemeProvider>
        {theme => (
          <ThemeProvider theme={theme}>
            <ToastProvider
              components={{ Toast: Toast, ToastContainer: () => null }}
            >
              <BreadcrumbsProvider>
                <AppStateProvider>
                  <ServicesProvider>
                    <Router history={history}>
                      <Story />
                    </Router>
                  </ServicesProvider>
                </AppStateProvider>
              </BreadcrumbsProvider>
            </ToastProvider>
          </ThemeProvider>
        )}
      </AppThemeProvider>
    </StylesProvider>
  )
]
