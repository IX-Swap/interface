import React from 'react'
import { fireEvent, waitFor, renderWithUserStore, render } from 'test-utils'
import {
  Register,
  registerFormInitialValues
} from 'auth/pages/register/Register'
import { signupArgs } from '__fixtures__/auth'
import { history } from 'config/history'
import * as useSignupHook from 'auth/hooks/useSignup'
import { generateMutationResult } from '__fixtures__/useQuery'
import { Form } from 'components/form/Form'

describe('Register', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders with empty initial values', () => {
    const { container, getByTestId } = renderWithUserStore(
      <Form defaultValues={registerFormInitialValues}>
        <Register />
      </Form>
    )
    const form = getByTestId('register-form')
    const signupButton = getByTestId('submit')

    expect(container).toBeTruthy()
    expect(signupButton).toBeTruthy()
    expect(form).toHaveFormValues(registerFormInitialValues)
  })

  it('handles user input', () => {
    const { getByLabelText, getByTestId } = render(<Register />)
    const form = getByTestId('register-form')
    const name = getByLabelText(/name/i)
    const email = getByLabelText(/email/i)
    const agree = getByTestId('agree-to-terms')
    const password = getByLabelText(/password/i)

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: signupArgs.password } })
    fireEvent.click(agree, { cancellable: true, bubbles: true })

    expect(form).toHaveFormValues(signupArgs)
  })

  it('handles submit', async () => {
    const signup = jest.fn()
    jest
      .spyOn(useSignupHook, 'useSignup')
      .mockImplementation(() => [signup, generateMutationResult({})])

    const { getByLabelText, getByTestId } = renderWithUserStore(<Register />)
    const name = getByLabelText(/name/i)
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const agree = getByTestId('agree-to-terms')
    const signupButton = getByTestId('submit')

    fireEvent.change(name, { target: { value: signupArgs.name } })
    fireEvent.change(email, { target: { value: signupArgs.email } })
    fireEvent.change(password, { target: { value: 'Dr0wss@pDr0wss@p' } })
    fireEvent.click(agree, { cancellable: true, bubbles: true })

    fireEvent.click(signupButton)

    await waitFor(() => {
      expect(signup).toHaveBeenCalledTimes(1)
      expect(signup).toHaveBeenCalledWith({
        name: signupArgs.name,
        email: signupArgs.email,
        password: 'Dr0wss@pDr0wss@p',
        mobileNo: undefined,
        oldEmail: undefined,
        oldMobileNo: undefined,
        singPassLogin: false
      })
    })
  })
})
