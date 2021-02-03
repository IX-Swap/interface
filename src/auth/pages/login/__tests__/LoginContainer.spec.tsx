import React from 'react'
import { fireEvent, cleanup, waitFor, render } from 'test-utils'
import { LoginContainer } from 'auth/pages/login/LoginContainer'
import { loginArgs } from '__fixtures__/auth'
import { history } from 'config/history'
import { AuthRoute } from 'auth/router'
import * as useLoginHook from 'auth/hooks/useLogin'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('LoginContainer', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders with empty initial values', () => {
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
    const email = getByLabelText(/email address/i)
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
    jest.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      mutation: [login, generateMutationResult({ data: user })],
      step: 'login'
    })

    const { getByText, getByLabelText } = render(<LoginContainer />)
    const email = getByLabelText(/email address/i)
    const password = getByLabelText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    fireEvent.click(loginButton)
    expect(loginButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1)
      expect(login).toHaveBeenCalledWith({
        password: loginArgs.password,
        email: loginArgs.email
      })
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = render(<LoginContainer />)
    const forgotPasswordButton = getByText(/forgot password/i)

    fireEvent.click(forgotPasswordButton)
    expect(history.location.pathname).toBe(AuthRoute.passwordReset)
  })
})
