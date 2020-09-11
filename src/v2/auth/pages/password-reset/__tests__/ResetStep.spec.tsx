/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  fakePasswordResetStore,
  fireEvent,
  renderWithPasswordResetStore,
  waitFor
} from 'test-utils'
import {
  ResetStep,
  completePasswordResetInitialValues
} from 'v2/auth/pages/password-reset/ResetStep'
import { cleanup } from '@testing-library/react'
import { completePasswordResetArgs } from '__fixtures__/auth'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import * as useCompletePasswordResetHook from 'v2/auth/hooks/useCompletePasswordReset'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('ResetStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
    const { getByTestId } = renderWithPasswordResetStore(<ResetStep />)
    const form = getByTestId('reset-step')

    expect(form).toBeTruthy()
    expect(form).toHaveFormValues(completePasswordResetInitialValues)
  })

  it('handles user input', () => {
    const { getByLabelText, getByTestId } = renderWithPasswordResetStore(
      <ResetStep />
    )
    const form = getByTestId('reset-step')
    const token = getByLabelText(/password reset token/i)
    const password = getByLabelText(/new password/i)

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
      getByLabelText
    } = renderWithPasswordResetStore(<ResetStep />)
    const token = getByLabelText(/password reset token/i)
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
      getByLabelText
    } = renderWithPasswordResetStore(<ResetStep />)
    const password = getByLabelText(/new password/i)
    const submitButton = getByText(/complete/i)

    fireEvent.blur(password)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(
        getAllByText('Password must be at least 12 characters long').length
      ).toBe(1)
    })
  })

  it('handles submit', async () => {
    const completeReset = jest.fn()
    jest
      .spyOn(useCompletePasswordResetHook, 'useCompletePasswordReset')
      .mockReturnValue([completeReset, generateMutationResult({})])

    const store = {
      email: completePasswordResetArgs.email
    }
    const { getByText, getByLabelText } = renderWithPasswordResetStore(
      <ResetStep />,
      store
    )
    const token = getByLabelText(/password reset token/i)
    const password = getByLabelText(/new password/i)
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
      expect(completeReset).toHaveBeenCalledTimes(1)
      expect(completeReset).toHaveBeenCalledWith(completePasswordResetArgs)
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
