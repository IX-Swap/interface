import React from 'react'
import { Route, Router } from 'react-router-dom'
import {
  render,
  waitFor,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import { ThemeProvider, Theme, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import createGenerateClassName from '@mui/styles/createGenerateClassName';
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
import apiService from 'services/api'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export const apiServiceMock = {
  put: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn()
}
export const snackbarServiceMock = {
  showSnackbar: jest.fn(),
  showNotification: jest.fn(),
  showOnboardingDialog: jest.fn()
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

export const BaseProviders: React.FC<{ mockAPI?: boolean }> = ({
  children,
  mockAPI = false
}) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <AppThemeProvider>
        {theme => (
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <AppStateProvider>
                <ToastProvider
                  components={{ Toast: Toast, ToastContainer: () => null }}
                >
                  <ServicesProvider
                    value={{
                      apiService: mockAPI ? apiServiceMock : apiService,
                      snackbarService: snackbarServiceMock
                    }}
                  >
                    <BreadcrumbsProvider>
                      <Router history={history}>{children}</Router>
                    </BreadcrumbsProvider>
                  </ServicesProvider>
                </ToastProvider>
              </AppStateProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        )}
      </AppThemeProvider>
    </StylesProvider>
  );
}

const customRenderer = (
  ui: any,
  options: Omit<RenderOptions, 'queries'> & { mockAPI?: boolean } = {}
): RenderResult => {
  const { mockAPI, ...rest } = options

  return render(ui, {
    wrapper: ({ children }) => (
      <BaseProviders mockAPI={mockAPI ?? true}>{children}</BaseProviders>
    ),
    ...rest
  })
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
  store: object = {
    apiService: apiServiceMock,
    snackbarService: snackbarServiceMock
  },
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
    const defaultTheme = createTheme()
    const theme = createTheme(adaptV4Theme({
      props: { ...defaultTheme, MuiWithWidth: { initialWidth } }
    }))

    return (
      <BaseProviders>
        <UserProvider value={{ ...fakeUserStore }}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
          </StyledEngineProvider>
        </UserProvider>
      </BaseProviders>
    );
  }

  return render(ui, { wrapper: SizeWrapper })
}

export const invokeMutationFn = async (result: any, payload: any) => {
  await waitFor(() => result.current)
  const response = await result.current[0](payload)
  return response
}

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRenderer as render }
