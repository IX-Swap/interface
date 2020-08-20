import React from 'react'
import { Router } from 'react-router-dom'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Themes from './themes'
import history from './v2/history'
import { UserProvider } from 'v2/auth/context'
import { UserStore } from 'v2/auth/context/store'
import { PasswordResetProvider } from 'v2/auth/context/password-reset'
import PasswordResetStore from 'v2/auth/context/password-reset/store'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { AuthorizerTableStore } from 'v2/app/authorizer/context/store'
import { AuthorizerTableStoreProvider } from 'v2/app/authorizer/context'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

const BaseProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={Themes.default}>
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

export const fakeAuthorizerTableStore: Partial<AuthorizerTableStore> = {
  idKey: '__',
  uri: '/api/source'
}

export const renderWithAuthorizerTableStore = (
  ui: any,
  store?: Partial<AuthorizerTableStore>
): RenderResult => {
  const WithUserProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <AuthorizerTableStoreProvider
        value={{ ...fakeAuthorizerTableStore, ...store }}
      >
        {children}
      </AuthorizerTableStoreProvider>
    </BaseProviders>
  )

  return render(ui, { wrapper: WithUserProvider })
}

export * from '@testing-library/react'
export { customRenderer as render }
