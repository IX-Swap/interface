import React from 'react'
import { fireEvent, renderWithPasswordResetStore, waitFor } from 'test-utils'
import {
  RequestStep,
  requestPasswordResetInitialValues
} from 'auth/pages/password-reset/RequestStep'
import { cleanup } from '@testing-library/react'
import { requestPasswordResetArgs } from '__fixtures__/auth'
import { history } from 'config/history'
import * as useRequestPasswordResetHook from 'auth/hooks/useRequestPasswordReset'
import { generateMutationResult } from '__fixtures__/useQuery'
import { AuthRoute } from 'auth/router/config'

describe('RequestStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders the form with correct default values', () => {
    const { getByTestId } = renderWithPasswordResetStore(<RequestStep />)
    const form = getByTestId('request-step')

    expect(form).toBeTruthy()
    expect(form).toHaveFormValues(requestPasswordResetInitialValues)
  })

  it('handles user input', () => {
    const { getByLabelText, getByTestId } = renderWithPasswordResetStore(
      <RequestStep />
    )
    const form = getByTestId('request-step')
    const email = getByLabelText(/email/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(form).toHaveFormValues(requestPasswordResetArgs)
  })

  it('handles submit', async () => {
    const requestReset = jest.fn()
    const setEmail = jest.fn()
    jest
      .spyOn(useRequestPasswordResetHook, 'useRequestPasswordReset')
      .mockReturnValue([requestReset, generateMutationResult({})])

    const { getByText, getByLabelText } = renderWithPasswordResetStore(
      <RequestStep />,
      { setEmail }
    )
    const email = getByLabelText(/email address/i)
    const submitButton = getByText(/reset/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(setEmail).toHaveBeenCalledWith(requestPasswordResetArgs.email)
      expect(requestReset).toHaveBeenCalledWith(requestPasswordResetArgs)
    })
  })

  it('handles click on "Back To Login"', async () => {
    const { getByText } = renderWithPasswordResetStore(<RequestStep />)
    const backToLogin = getByText(/back to login/i)

    fireEvent.click(backToLogin)
    expect(history.location.pathname).toBe(AuthRoute.login)
  })
})
