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
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/new password/i)

    fireEvent.change(email, {
      target: { value: completePasswordResetArgs.email }
    })

    fireEvent.change(password, {
      target: { value: completePasswordResetArgs.newPassword }
    })

    expect(form).toHaveFormValues({
      email: completePasswordResetArgs.email,
      newPassword: completePasswordResetArgs.newPassword
    })
  })

  it('handles email validation', async () => {
    const {
      getByText,
      getAllByText,
      getByLabelText
    } = renderWithPasswordResetStore(<ResetStep />)
    const email = getByLabelText(/email/i)
    const submitButton = getByText(/complete/i)

    fireEvent.blur(email)

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
        getAllByText('Password does not meet complexity requirement').length
      ).toBe(1)
    })
  })

  it('handles submit', async () => {
    const completeReset = jest.fn()
    jest
      .spyOn(useCompletePasswordResetHook, 'useCompletePasswordReset')
      .mockReturnValue([completeReset, generateMutationResult({})])

    const store = {
      token: completePasswordResetArgs.resetToken
    }
    const { getByText, getByLabelText } = renderWithPasswordResetStore(
      <ResetStep />,
      store
    )
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/new password/i)
    const submitButton = getByText(/complete/i)

    fireEvent.change(email, {
      target: { value: completePasswordResetArgs.email }
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
