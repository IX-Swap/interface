/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fakeUserStore, renderWithUserStore } from 'test-utils'
import AuthEntryPoint from 'v2/auth/AuthRoot'
import history from 'v2/history'
import { cleanup } from '@testing-library/react'
import { AuthRoute } from 'v2/auth/router'
import { Login } from 'v2/auth/login/Login'
import { Register } from 'v2/auth/register/Register'
import { PasswordReset } from 'v2/auth/password-reset/PasswordReset'
import { Confirmation } from 'v2/auth/confirmation/Confirmation'

jest.mock('v2/auth/login/Login', () => ({
  Login: jest.fn(() => null)
}))
jest.mock('v2/auth/register/Register', () => ({
  Register: jest.fn(() => null)
}))
jest.mock('v2/auth/password-reset/PasswordReset', () => ({
  PasswordReset: jest.fn(() => null)
}))
jest.mock('v2/auth/confirmation/Confirmation', () => ({
  Confirmation: jest.fn(() => null)
}))

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

    renderWithUserStore(<AuthEntryPoint />)

    expect(Login).toHaveBeenCalledTimes(1)
  })

  it('renders Register if path is /auth/register', () => {
    history.push(AuthRoute.signup)

    renderWithUserStore(<AuthEntryPoint />)

    expect(Register).toHaveBeenCalledTimes(1)
  })

  it('renders Confirmation if path is /auth/confirm', () => {
    history.push(AuthRoute.confirm)

    renderWithUserStore(<AuthEntryPoint />)

    expect(Confirmation).toHaveBeenCalledTimes(1)
  })

  it('renders PasswordReset if path is /auth/reset-password', () => {
    history.push(AuthRoute.passwordReset)

    renderWithUserStore(<AuthEntryPoint />)

    expect(PasswordReset).toHaveBeenCalledTimes(1)
  })
})
