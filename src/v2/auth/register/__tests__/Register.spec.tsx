/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, cleanup, waitFor, renderWithUserStore } from 'test-utils'
import { Register, registerFormInitialValues } from 'v2/auth/register/Register'
import { signupArgs } from '__fixtures__/auth'
import history from 'v2/history'

describe('Register', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders with empty initial values', () => {
    const { container, getByTestId, getByText } = renderWithUserStore(
      <Register />
    )
    const form = getByTestId('register-form')
    const signupButton = getByText(/create/i)

    expect(container).toBeTruthy()
    expect(signupButton).toBeTruthy()
    expect(signupButton.parentElement).toBeDisabled()
    expect(form).toHaveFormValues(registerFormInitialValues)
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = renderWithUserStore(
      <Register />
    )
    const form = getByTestId('register-form')
    const name = getByPlaceholderText(/name/i)
    const email = getByPlaceholderText(/email address/i)
    const password = getByPlaceholderText(/password/i)

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: signupArgs.password } })

    expect(form).toHaveFormValues(signupArgs)
  })

  it('handles submit', async () => {
    const signup = jest.fn()
    const {
      getByText,
      getByPlaceholderText
    } = renderWithUserStore(<Register />, { signup })
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
      expect(signup).toHaveBeenCalledTimes(1)
      expect(signup).toHaveBeenCalledWith(signupArgs)
    })
  })

  it('handles name validation', async () => {
    const { getByText, getByPlaceholderText } = renderWithUserStore(
      <Register />
    )
    const name = getByPlaceholderText(/name/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(name)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getByText('Required')).toBeTruthy()
    })
  })

  it('handles email validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithUserStore(<Register />)
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
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithUserStore(<Register />)
    const password = getByPlaceholderText(/password/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(
        getAllByText('Password does not meet complexity requirement').length
      ).toBe(1)
    })
  })
})
