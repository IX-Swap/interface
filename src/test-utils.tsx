import React from 'react'
import { Router } from 'react-router-dom'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { SnackbarContainer } from 'uno-material-ui'

import Themes from './themes'
import history from './v2/history'
import { UserProvider } from 'v2/Auth/context'
import { UserStore } from 'v2/Auth/context/store'
import { PasswordResetProvider } from 'v2/Auth/context/password-reset'
import PasswordResetStore from 'v2/Auth/context/password-reset/store'
import { PasswordResetStep } from 'v2/Auth/context/password-reset/types'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

const BaseProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={Themes.default}>
        <SnackbarContainer />
        <CssBaseline />
        <Router history={history}>{children}</Router>
      </ThemeProvider>
    </StylesProvider>
  )
}

const customRenderer = (
  ui: any,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(ui, { wrapper: BaseProviders, ...options })
}

export const testComponentId = 'test-component'

export const fakeUserStore: Partial<UserStore> = {
  activeTab: 0,
  setActiveTab: jest.fn()
}

export const renderWithUserStore = (
  ui: any,
  store?: Partial<UserStore>
): RenderResult => {
  const WithUserProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <UserProvider value={{ ...fakeUserStore, ...store }}>
        {children}
      </UserProvider>
    </BaseProviders>
  )

  return render(ui, { wrapper: WithUserProvider })
}

export const fakePasswordResetStore: Partial<PasswordResetStore> = {
  currentStep: PasswordResetStep.Request,
  setCurrentStep: jest.fn()
}

export const renderWithPasswordResetStore = (
  ui: any,
  store?: Partial<PasswordResetStore>
): RenderResult => {
  const WithUserProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <PasswordResetProvider value={{ ...fakePasswordResetStore, ...store }}>
        {children}
      </PasswordResetProvider>
    </BaseProviders>
  )

  return render(ui, { wrapper: WithUserProvider })
}

export * from '@testing-library/react'
export { customRenderer as render }
