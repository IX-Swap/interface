import React from 'react'
import { Router } from 'react-router-dom'
import { history } from '../src/config/history'
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core/styles'
import { ServicesProvider } from '../src/hooks/useServices'
import { BreadcrumbsProvider } from '../src/hooks/useBreadcrumbs'
import { ToastProvider } from 'react-toast-notifications'
import { AppStateProvider } from '../src/app/hooks/useAppState'
import { Toast } from '../src/components/Toast'
import { AppThemeProvider } from '../src/AppThemeProvider'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
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
