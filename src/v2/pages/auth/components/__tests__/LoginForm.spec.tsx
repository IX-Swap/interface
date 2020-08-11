/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, fireEvent, cleanup, waitFor } from 'test-utils'
import LoginForm, { loginFormInitialValues } from '../LoginForm'
import { useUserStore } from 'v2/context/user'
import { loginArgs } from '__fixtures__/auth'
import history from '../../../../history'

jest.mock('v2/context/user')

const useUserStoreMocked = useUserStore as jest.Mock<
  Partial<ReturnType<typeof useUserStore>>
>

describe('LoginForm', () => {
  beforeEach(() => {
    history.push('/')
    useUserStoreMocked.mockReturnValue({
      login: jest.fn()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders with empty initial values', () => {
    const { container, getByTestId, getByText } = render(<LoginForm />)
    const form = getByTestId('loginForm')
    const loginButton = getByText(/login/i)
    const forgotPasswordButton = getByText(/forgot password/i)

    expect(container).toBeTruthy()
    expect(loginButton).toBeTruthy()
    expect(loginButton.parentElement).toBeDisabled()
    expect(forgotPasswordButton).toBeTruthy()
    expect(form).toHaveFormValues(loginFormInitialValues)
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginForm />)
    const form = getByTestId('loginForm')
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    expect(form).toHaveFormValues({ ...loginArgs, otp: '' })
  })

  it('handles submit', async () => {
    const userStore = useUserStoreMocked()
    const { getByText, getByPlaceholderText } = render(<LoginForm />)
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.change(email, { target: { value: loginArgs.email } })
    fireEvent.change(password, { target: { value: loginArgs.password } })

    expect(loginButton.parentElement).toBeEnabled()
    fireEvent.click(loginButton)
    expect(loginButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(userStore.login).toHaveBeenCalledTimes(1)
      expect(userStore.login).toHaveBeenCalledWith({ ...loginArgs, otp: '' })
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = render(<LoginForm />)
    const forgotPasswordButton = getByText(/forgot password/i)

    fireEvent.click(forgotPasswordButton)
    expect(history.location.pathname).toBe('/reset')
  })

  it('handles email validation', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <LoginForm />
    )
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
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <LoginForm />
    )
    const password = getByPlaceholderText(/password/i)
    const loginButton = getByText(/login/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(loginButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })
  })
})
