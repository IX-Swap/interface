import React from 'react'
import { Route, Router } from 'react-router-dom'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { history } from 'config/history'
import { UserProvider } from 'auth/context'
import { UserStore } from 'auth/context/store'
import { PasswordResetProvider } from 'auth/context/password-reset'
import PasswordResetStore from 'auth/context/password-reset/store'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { DepositStore } from 'app/pages/accounts/pages/banks/context/store'
import { DepositStoreProvider } from 'app/pages/accounts/pages/banks/context'
import { ServicesProvider } from 'hooks/useServices'
import { renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { BreadcrumbsProvider } from 'hooks/useBreadcrumbs'
import { ToastProvider } from 'react-toast-notifications'
import { AppStateProvider } from 'app/hooks/useAppState'
import { Form } from 'components/form/Form'
import { Toast } from 'components/Toast'
import { AppThemeProvider } from 'AppThemeProvider'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

export const BaseProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <AppThemeProvider>
        {theme => (
          <ThemeProvider theme={theme}>
            <AppStateProvider>
              <ToastProvider
                components={{ Toast: Toast, ToastContainer: () => null }}
              >
                <BreadcrumbsProvider>
                  <ServicesProvider
                    value={{
                      snackbarService: {
                        showSnackbar: jest.fn(),
                        showNotification: jest.fn(),
                        showOnboardingDialog: jest.fn()
                      }
                    }}
                  >
                    <Router history={history}>{children}</Router>
                  </ServicesProvider>
                </BreadcrumbsProvider>
              </ToastProvider>
            </AppStateProvider>
          </ThemeProvider>
        )}
      </AppThemeProvider>
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

export const fakeDepositStore: Partial<DepositStore> = {}

export const renderWithDepositStore = (
  ui: any,
  store?: Partial<DepositStore>
): RenderResult => {
  const WithUserProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <DepositStoreProvider value={{ ...fakeDepositStore, ...store }}>
        {children}
      </DepositStoreProvider>
    </BaseProviders>
  )

  return render(ui, { wrapper: WithUserProvider })
}

export const renderHookWithServiceProvider = (
  hookFn: any,
  store: object = {},
  path?: string
): RenderHookResult<any, any> => {
  const WithServiceProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <Route path={path}>
        <ServicesProvider value={store}>
          <Form>{children}</Form>
        </ServicesProvider>
      </Route>
    </BaseProviders>
  )

  return renderHook(hookFn, { wrapper: WithServiceProvider })
}

export const renderHookWithForm = (
  hookFn: any,
  defaultValues: object = {}
): RenderHookResult<any, any> => {
  const WithForm: React.FC = ({ children }) => (
    <BaseProviders>
      <Form defaultValues={defaultValues}>{children}</Form>
    </BaseProviders>
  )

  return renderHook(hookFn, { wrapper: WithForm })
}

export const renderWithInitialWidth = (ui: any, initialWidth: any) => {
  const SizeWrapper = (props: any) => {
    const defaultTheme = createMuiTheme()
    const theme = createMuiTheme({
      props: { ...defaultTheme, MuiWithWidth: { initialWidth } }
    })

    return (
      <BaseProviders>
        <UserProvider value={{ ...fakeUserStore }}>
          <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </UserProvider>
      </BaseProviders>
    )
  }

  return render(ui, { wrapper: SizeWrapper })
}

export * from '@testing-library/react'
export { customRenderer as render }
