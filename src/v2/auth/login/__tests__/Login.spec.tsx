/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, cleanup, waitFor, renderWithUserStore } from 'test-utils'
import { Login, loginFormInitialValues } from 'v2/auth/login/Login'
import { loginArgs } from '__fixtures__/auth'
import history from 'v2/history'
import { AuthRoute } from 'v2/auth/router'

describe('LoginForm', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders with empty initial values', () => {
    const { container, getByTestId, getByText } = renderWithUserStore(<Login />)
    const form = getByTestId('login-form')
    const loginButton = getByText(/login/i)
    const forgotPasswordButton = getByText(/forgot password/i)

    expect(container).toBeTruthy()
    expect(loginButton).toBeTruthy()
    expect(loginButton.parentElement).toBeDisabled()
    expect(forgotPasswordButton).toBeTruthy()
    expect(form).toHaveFormValues(loginFormInitialValues)
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = renderWithUserStore(<Login />)
    const form = getByTestId('login-form')
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    expect(form).toHaveFormValues({ ...loginArgs, otp: '' })
  })

  it('handles submit', async () => {
    const login = jest.fn()
    const { getByText, getByPlaceholderText } = renderWithUserStore(<Login />, {
      login
    })
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    expect(loginButton.parentElement).toBeEnabled()
    fireEvent.click(loginButton)
    expect(loginButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1)
      expect(login).toHaveBeenCalledWith({ ...loginArgs, otp: '' })
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = renderWithUserStore(<Login />)
    const forgotPasswordButton = getByText(/forgot password/i)

    fireEvent.click(forgotPasswordButton)
    expect(history.location.pathname).toBe(AuthRoute.passwordReset)
  })

  it('handles email validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithUserStore(<Login />)
    const email = getByPlaceholderText(/email address/i)
    const loginButton = getByText(/login/i)

    fireEvent.blur(email)

    await waitFor(() => {
      expect(loginButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })

    fireEvent.change(email, { target: { value: 'hello' } })
    fireEvent.blur(email)

    await waitFor(() => {
      expect(loginButton.parentElement).toBeDisabled()
      expect(getByText('email must be a valid email')).toBeTruthy()
    })
  })

  it('handles password validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithUserStore(<Login />)
    const password = getByPlaceholderText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(loginButton.parentElement).toBeDisabled()
      expect(
        getAllByText('Password does not meet complexity requirement').length
      ).toBe(1)
    })
  })
})
