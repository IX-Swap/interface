import React from 'react'
import { fireEvent, waitFor, render } from 'test-utils'
import { LoginContainer } from 'auth/pages/login/LoginContainer'
import { loginArgs } from '__fixtures__/auth'
import { history } from 'config/history'
import { AuthRoute } from 'auth/router/config'
import * as useLoginHook from 'auth/hooks/useLogin'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

jest.mock('config', () => ({
  RECAPTCHA_KEY: '123'
}))

describe('LoginContainer', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders with empty initial values', () => {
    const { container, getByTestId, getByText } = render(<LoginContainer />)
    const form = getByTestId('login-form')
    const loginButton = getByText(/login/i)
    const forgotPasswordButton = getByText(/forgot password/i)

    expect(container).toBeTruthy()
    expect(loginButton).toBeTruthy()
    expect(forgotPasswordButton).toBeTruthy()
    expect(form).toHaveFormValues({ password: '', email: '' })
  })

  it('handles user input', () => {
    const { getByLabelText, getByTestId } = render(<LoginContainer />)
    const form = getByTestId('login-form')
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    expect(form).toHaveFormValues({
      password: loginArgs.password,
      email: loginArgs.email
    })
  })

  it('handles submit', async () => {
    const login = jest.fn()
    const resetAttempts = jest.fn()
    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'login',
      attempts: 0,
      resetAttempts: resetAttempts,
      locked: false,
      email: ''
    })

    const { getByText, getByLabelText } = render(<LoginContainer />)
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1)
      expect(login).toHaveBeenCalledWith({
        password: loginArgs.password,
        email: loginArgs.email
      })
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const login = jest.fn()
    const resetAttempts = jest.fn()
    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'login',
      attempts: 0,
      resetAttempts: resetAttempts,
      locked: false,
      email: ''
    })

    const { getByText } = render(<LoginContainer />)
    const forgotPasswordButton = getByText(/forgot/i)

    fireEvent.click(forgotPasswordButton)
    expect(history.location.pathname).toBe(AuthRoute.passwordReset)
  })

  it('shows recaptcha when attempt === 3', () => {
    const login = jest.fn()
    const resetAttempts = jest.fn()

    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'login',
      attempts: 3,
      resetAttempts: resetAttempts,
      locked: false,
      email: ''
    })

    const { getByText } = render(<LoginContainer />)

    expect(
      getByText(
        'We notice multiple failed attempts. Please verify you are not a robot.'
      )
    ).toBeTruthy()
  })

  it('show otp field when step is otp', () => {
    const login = jest.fn()
    const resetAttempts = jest.fn()
    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'otp',
      attempts: 0,
      resetAttempts: resetAttempts,
      locked: false,
      email: ''
    })

    const { getByText } = render(<LoginContainer />)

    expect(getByText('Two-factor authentication')).toBeTruthy()
  })

  it('shows locked view when mutation returns that account is locked', () => {
    const login = jest.fn()
    const resetAttempts = jest.fn()
    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'otp',
      attempts: 0,
      resetAttempts: resetAttempts,
      locked: true,
      email: ''
    })

    const { getByText } = render(<LoginContainer />)

    expect(
      getByText(
        'Your account has been locked due to multiple failed attempts. We have sent a reset link to your registered email address.'
      )
    ).toBeTruthy()
  })
})
