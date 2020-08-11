/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, fireEvent, cleanup, waitFor } from 'test-utils'
import SignupForm, { registerFormInitialValues } from '../RegisterForm'
import { useUserStore } from 'v2/context/user'
import { signupArgs } from '__fixtures__/auth'
import history from '../../../../history'

jest.mock('v2/context/user')

const useUserStoreMocked = useUserStore as jest.Mock<
  Partial<ReturnType<typeof useUserStore>>
>

describe('SignupForm', () => {
  beforeEach(() => {
    history.push('/')
    useUserStoreMocked.mockReturnValue({
      signup: jest.fn()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders with empty initial values', () => {
    const { container, getByTestId, getByText } = render(<SignupForm />)
    const form = getByTestId('signupForm')
    const signupButton = getByText(/create/i)

    expect(container).toBeTruthy()
    expect(signupButton).toBeTruthy()
    expect(signupButton.parentElement).toBeDisabled()
    expect(form).toHaveFormValues(registerFormInitialValues)
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = render(<SignupForm />)
    const form = getByTestId('signupForm')
    const name = getByPlaceholderText(/name/i)
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: signupArgs.password } })

    expect(form).toHaveFormValues(signupArgs)
  })

  it('handles submit', async () => {
    const userStore = useUserStoreMocked()
    const { getByText, getByPlaceholderText } = render(<SignupForm />)
    const name = getByPlaceholderText(/name/i)
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)
    const signupButton = getByText(/create/i)

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: signupArgs.password } })

    expect(signupButton.parentElement).toBeEnabled()
    fireEvent.click(signupButton)
    expect(signupButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(userStore.signup).toHaveBeenCalledTimes(1)
      expect(userStore.signup).toHaveBeenCalledWith(signupArgs)
    })
  })

  it('handles name validation', async () => {
    const { getByText, getByPlaceholderText } = render(<SignupForm />)
    const name = getByPlaceholderText(/name/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(name)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getByText('Required')).toBeTruthy()
    })
  })

  it('handles email validation', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <SignupForm />
    )
    const email = getByPlaceholderText(/email address/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(email)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })

    fireEvent.change(email, { target: { value: 'hello' } })
    fireEvent.blur(email)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getByText('email must be a valid email')).toBeTruthy()
    })
  })

  it('handles password validation', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <SignupForm />
    )
    const password = getByPlaceholderText(/password/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })
  })
})
