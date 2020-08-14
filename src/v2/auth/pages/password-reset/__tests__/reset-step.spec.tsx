/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, render, waitFor } from 'test-utils'
import RequestStep, {
  completePasswordResetInitialValues
} from 'v2/auth/pages/password-reset/reset-step'
import { cleanup } from '@testing-library/react'
import { completePasswordResetArgs } from '__fixtures__/auth'
import history from 'v2/history'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import ResetStep from 'v2/auth/pages/password-reset/reset-step'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

jest.mock('v2/auth/context/password-reset')

// FIXME
const usePasswordResetStoreMocked = (usePasswordResetStore as unknown) as jest.Mock<
  Partial<ReturnType<typeof usePasswordResetStore>>
>

usePasswordResetStoreMocked.mockReturnValue({
  completeReset: jest.fn(),
  setCurrentStep: jest.fn(),
  email: completePasswordResetArgs.email
})

describe('ResetStep', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
    const { getByTestId, getByText } = render(<ResetStep />)
    const form = getByTestId('reset-step')
    const submitButton = getByText(/complete/i)

    expect(form).toBeInTheDOM()
    expect(form).toHaveFormValues(completePasswordResetInitialValues)
    expect(submitButton.parentElement).toBeDisabled()
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = render(<RequestStep />)
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
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <RequestStep />
    )
    const token = getByPlaceholderText(/password reset token/i)
    const submitButton = getByText(/complete/i)

    fireEvent.blur(token)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })
  })

  it('handles password validation', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <RequestStep />
    )
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
    const passwordResetStore = usePasswordResetStoreMocked()
    const { getByText, getByPlaceholderText } = render(<RequestStep />)
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
      expect(passwordResetStore.completeReset).toHaveBeenCalledTimes(1)
      expect(passwordResetStore.completeReset).toHaveBeenCalledWith(
        completePasswordResetArgs
      )
    })
  })

  it('handles click on "Back"', async () => {
    const passwordResetStore = usePasswordResetStoreMocked()
    const { getByText } = render(<RequestStep />)
    const backButton = getByText(/back/i)

    fireEvent.click(backButton)

    expect(passwordResetStore.setCurrentStep).toBeCalledTimes(1)
    expect(passwordResetStore.setCurrentStep).toBeCalledWith(
      PasswordResetStep.Request
    )
  })
})
