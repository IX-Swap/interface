/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fakeUserStore, renderWithUserStore } from 'test-utils'
import AuthEntryPoint from 'v2/Auth/AuthRoot'
import history from 'v2/history'
import { cleanup } from '@testing-library/react'
import { AuthRoute } from 'v2/Auth/router'

jest.mock('v2/Auth/Login/Login', () => () => <div data-testid='test' />)
jest.mock('v2/Auth/Register/Register', () => () => <div data-testid='test' />)
jest.mock('v2/Auth/PasswordReset/PasswordReset', () => () => (
  <div data-testid='test' />
))

describe('AuthRoot', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('sets active tab to 0 if path is /auth/login', () => {
    history.push(AuthRoute.login)

    renderWithUserStore(<AuthEntryPoint />)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(0)
  })

  it('sets active tab to 1 if path is /auth/register', () => {
    history.push(AuthRoute.signup)

    renderWithUserStore(<AuthEntryPoint />)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(1)
  })

  it('redirects to /app if user is authenticated', () => {
    const store = {
      isAuthenticated: true
    }

    renderWithUserStore(<AuthEntryPoint />, store)

    expect(history.location.pathname).toBe('/app')
  })

  it('redirects to /auth/login if path does not match', () => {
    history.push('/wrong/path')
    renderWithUserStore(<AuthEntryPoint />)

    expect(history.location.pathname).toBe('/auth/login')
  })

  it('does not render AuthTabs on /password-reset route', () => {
    history.push(AuthRoute.passwordReset)
    const { queryByTestId } = renderWithUserStore(<AuthEntryPoint />)
    const authTabs = queryByTestId('auth-tabs')

    expect(authTabs).toBeFalsy()
  })

  it('renders Login if path is /auth/login', () => {
    history.push(AuthRoute.login)
    const { getByTestId } = renderWithUserStore(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })

  it('renders Register if path is /auth/register', () => {
    history.push(AuthRoute.signup)
    const { getByTestId } = renderWithUserStore(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })

  it('renders ResetPassword if path is /auth/reset-password', () => {
    history.push(AuthRoute.passwordReset)
    const { getByTestId } = renderWithUserStore(<AuthEntryPoint />)
    const component = getByTestId('test')

    expect(component).toBeTruthy()
  })
})
