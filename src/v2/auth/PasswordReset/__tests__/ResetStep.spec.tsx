/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  fakePasswordResetStore,
  fireEvent,
  renderWithPasswordResetStore,
  waitFor
} from 'test-utils'
import ResetStep, {
  completePasswordResetInitialValues
} from 'v2/auth/PasswordReset/ResetStep'
import { cleanup } from '@testing-library/react'
import { completePasswordResetArgs } from '__fixtures__/auth'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

describe('ResetStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
    const { getByTestId, getByText } = renderWithPasswordResetStore(
      <ResetStep />
    )
    const form = getByTestId('reset-step')
    const submitButton = getByText(/complete/i)

    expect(form).toBeInTheDOM()
    expect(form).toHaveFormValues(completePasswordResetInitialValues)
    expect(submitButton.parentElement).toBeDisabled()
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = renderWithPasswordResetStore(
      <ResetStep />
    )
    const form = getByTestId('reset-step')
    const token = getByPlaceholderText(/password reset token/i)
    const password = getByPlaceholderText(/new password/i)

    fireEvent.change(token, {
      target: { value: completePasswordResetArgs.resetToken }
    })

    fireEvent.change(password, {
      target: { value: completePasswordResetArgs.newPassword }
    })

    expect(form).toHaveFormValues({
      resetToken: completePasswordResetArgs.resetToken,
      newPassword: completePasswordResetArgs.newPassword
    })
  })

  it('handles token validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithPasswordResetStore(<ResetStep />)
    const token = getByPlaceholderText(/password reset token/i)
    const submitButton = getByText(/complete/i)

    fireEvent.blur(token)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })
  })

  it('handles password validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithPasswordResetStore(<ResetStep />)
    const password = getByPlaceholderText(/new password/i)
    const submitButton = getByText(/complete/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(
        getAllByText('Password does not meet complexity requirement').length
      ).toBe(1)
    })
  })

  it('handles submit', async () => {
    const store = {
      completeReset: jest.fn(),
      email: completePasswordResetArgs.email
    }
    const { getByText, getByPlaceholderText } = renderWithPasswordResetStore(
      <ResetStep />,
      store
    )
    const token = getByPlaceholderText(/password reset token/i)
    const password = getByPlaceholderText(/new password/i)
    const submitButton = getByText(/complete/i)

    fireEvent.change(token, {
      target: { value: completePasswordResetArgs.resetToken }
    })

    fireEvent.change(password, {
      target: { value: completePasswordResetArgs.newPassword }
    })

    expect(submitButton.parentElement).toBeEnabled()
    fireEvent.click(submitButton)
    expect(submitButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(store.completeReset).toHaveBeenCalledTimes(1)
      expect(store.completeReset).toHaveBeenCalledWith(
        completePasswordResetArgs
      )
    })
  })

  it('handles click on "Back"', async () => {
    const { getByText } = renderWithPasswordResetStore(<ResetStep />)
    const backButton = getByText(/back/i)

    fireEvent.click(backButton)

    expect(fakePasswordResetStore.setCurrentStep).toBeCalledTimes(1)
    expect(fakePasswordResetStore.setCurrentStep).toBeCalledWith(
      PasswordResetStep.Request
    )
  })
})
