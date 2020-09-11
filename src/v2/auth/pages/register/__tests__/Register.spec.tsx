/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  fireEvent,
  cleanup,
  waitFor,
  renderWithUserStore,
  render
} from 'test-utils'
import {
  Register,
  registerFormInitialValues
} from 'v2/auth/pages/register/Register'
import { signupArgs } from '__fixtures__/auth'
import { history } from 'v2/history'
import * as useSignupHook from 'v2/auth/hooks/useSignup'
import { generateMutationResult } from '__fixtures__/useQuery'

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
    expect(form).toHaveFormValues(registerFormInitialValues)
  })

  it('handles user input', () => {
    const { getByLabelText, getByTestId } = render(<Register />)
    const form = getByTestId('register-form')
    const name = getByLabelText(/name/i)
    const email = getByLabelText(/email address/i)
    const password = getByLabelText(/password/i)

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: signupArgs.password } })

    expect(form).toHaveFormValues(signupArgs)
  })

  it('handles submit', async () => {
    const signup = jest.fn()
    jest
      .spyOn(useSignupHook, 'useSignup')
      .mockReturnValueOnce([signup, generateMutationResult({})])

    const { getByText, getByLabelText } = renderWithUserStore(<Register />)
    const name = getByLabelText(/name/i)
    const email = getByLabelText(/email address/i)
    const password = getByLabelText(/password/i)
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
    const { getByText, getByLabelText } = renderWithUserStore(<Register />)
    const name = getByLabelText(/name/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(name)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(getByText('Required')).toBeTruthy()
    })
  })

  it('handles email validation', async () => {
    const { getByText, getAllByText, getByLabelText } = renderWithUserStore(
      <Register />
    )
    const email = getByLabelText(/email address/i)
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
    const { getByText, getAllByText, getByLabelText } = renderWithUserStore(
      <Register />
    )
    const password = getByLabelText(/password/i)
    const signupButton = getByText(/create/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(signupButton.parentElement).toBeDisabled()
      expect(
        getAllByText('Password must be at least 12 characters long').length
      ).toBe(1)
    })
  })
})
