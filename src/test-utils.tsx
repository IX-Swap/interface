import React from 'react'
import { Router } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { SnackbarContainer } from 'uno-material-ui'

import Themes from './themes'
import { UserProvider } from './context/user'
import history from './v2/history'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

const AllProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={Themes.default}>
        <SnackbarContainer />
        <CssBaseline />
        <UserProvider>
          <Router history={history}>{children}</Router>
        </UserProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

const customRenderer = (ui: any, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export const testComponentId = 'test-component'

export * from '@testing-library/react'
export { customRenderer as render }
