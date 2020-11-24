import React from 'react'
import { fakeUserStore, renderWithUserStore } from 'test-utils'
import { AuthRoot } from 'v2/auth/AuthRoot'
import { history } from 'v2/history'
import { cleanup } from '@testing-library/react'
import { AuthRoute } from 'v2/auth/router'
import { Login } from 'v2/auth/pages/login/Login'
import { Register } from 'v2/auth/pages/register/Register'
import { PasswordReset } from 'v2/auth/pages/password-reset/PasswordReset'
import { Confirmation } from 'v2/auth/pages/confirmation/Confirmation'
import { AuthTabs } from 'v2/auth/components/AuthTabs'

jest.mock('v2/auth/pages/login/Login', () => ({
  Login: jest.fn(() => null)
}))
jest.mock('v2/auth/pages/register/Register', () => ({
  Register: jest.fn(() => null)
}))
jest.mock('v2/auth/pages/password-reset/PasswordReset', () => ({
  PasswordReset: jest.fn(() => null)
}))
jest.mock('v2/auth/pages/confirmation/Confirmation', () => ({
  Confirmation: jest.fn(() => null)
}))
jest.mock('v2/auth/components/AuthTabs', () => ({
  AuthTabs: jest.fn(() => null)
}))

describe('AuthRoot', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('sets active tab to 0 if path is /auth/login', () => {
    history.push(AuthRoute.login)

    renderWithUserStore(<AuthRoot />)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(0)
  })

  it('sets active tab to 1 if path is /auth/register', () => {
    history.push(AuthRoute.signup)

    renderWithUserStore(<AuthRoot />)

    expect(fakeUserStore.setActiveTab).toBeCalledTimes(1)
    expect(fakeUserStore.setActiveTab).toBeCalledWith(1)
  })

  it('does not render AuthTabs on /password-reset route', () => {
    history.push(AuthRoute.passwordReset)

    renderWithUserStore(<AuthRoot />)

    expect(AuthTabs).not.toHaveBeenCalled()
  })

  it('renders Login if path is /auth/login', () => {
    history.push(AuthRoute.login)

    renderWithUserStore(<AuthRoot />)

    expect(Login).toHaveBeenCalled()
  })

  it('renders Register if path is /auth/register', () => {
    history.push(AuthRoute.signup)

    renderWithUserStore(<AuthRoot />)

    expect(Register).toHaveBeenCalled()
  })

  it('renders Confirmation if path is /auth/confirm', () => {
    history.push(AuthRoute.confirm)

    renderWithUserStore(<AuthRoot />)

    expect(Confirmation).toHaveBeenCalled()
  })

  it('renders PasswordReset if path is /auth/reset-password', () => {
    history.push(AuthRoute.passwordReset)

    renderWithUserStore(<AuthRoot />)

    expect(PasswordReset).toHaveBeenCalled()
  })
})
