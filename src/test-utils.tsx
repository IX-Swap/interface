import React, { cloneElement, PropsWithChildren } from 'react'
import { Router } from 'react-router-dom'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Themes from './v2/themes'
import { history } from 'v2/history'
import { UserProvider } from 'v2/auth/context'
import { UserStore } from 'v2/auth/context/store'
import { PasswordResetProvider } from 'v2/auth/context/password-reset'
import PasswordResetStore from 'v2/auth/context/password-reset/store'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { DepositStore } from 'v2/app/pages/accounts/pages/banks/context/store'
import { DepositStoreProvider } from 'v2/app/pages/accounts/pages/banks/context'
import { ServicesProvider } from 'v2/hooks/useServices'
import { renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { BreadcrumbsProvider } from 'v2/hooks/useBreadcrumbs'
import { FormProvider, useForm } from 'react-hook-form'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

const BaseProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={Themes.default}>
        <BreadcrumbsProvider>
          <Router history={history}>{children}</Router>
        </BreadcrumbsProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export const renderWithFormControl = (ui: any): RenderResult => {
  const WithUserProvider: React.FC = ({ children }: PropsWithChildren<any>) => {
    const form = useForm()
    return (
      <BaseProviders>
        <FormProvider {...form}>
          {cloneElement(children, { control: form.control })}
        </FormProvider>
      </BaseProviders>
    )
  }

  return render(ui, { wrapper: WithUserProvider })
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
  store: object = {}
): RenderHookResult<any, any> => {
  const WithServiceProvider: React.FC = ({ children }) => (
    <BaseProviders>
      <ServicesProvider value={store}>{children}</ServicesProvider>
    </BaseProviders>
  )

  return renderHook(hookFn, { wrapper: WithServiceProvider })
}

export * from '@testing-library/react'
export { customRenderer as render }
