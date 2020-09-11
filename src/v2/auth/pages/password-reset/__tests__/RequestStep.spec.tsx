/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, renderWithPasswordResetStore, waitFor } from 'test-utils'
import {
  RequestStep,
  requestPasswordResetInitialValues
} from 'v2/auth/pages/password-reset/RequestStep'
import { cleanup } from '@testing-library/react'
import { requestPasswordResetArgs } from '__fixtures__/auth'
import { history } from 'v2/history'
import * as useRequestPasswordResetHook from 'v2/auth/hooks/useRequestPasswordReset'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('RequestStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
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

  it('handles email validation', async () => {
    const {
      getByText,
      getAllByText,
      getByLabelText
    } = renderWithPasswordResetStore(<RequestStep />)
    const email = getByLabelText(/email address/i)
    const submitButton = getByText(/reset/i)

    fireEvent.blur(email)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(getAllByText('Required').length).toBe(1)
    })

    fireEvent.change(email, { target: { value: 'hello' } })
    fireEvent.blur(email)

    await waitFor(() => {
      expect(submitButton.parentElement).toBeDisabled()
      expect(getByText('email must be a valid email')).toBeTruthy()
    })
  })

  it('handles submit', async () => {
    const requestReset = jest.fn()
    const setEmail = jest.fn()
    jest
      .spyOn(useRequestPasswordResetHook, 'useRequestPasswordReset')
      .mockReturnValue([requestReset, generateMutationResult({})])

    const {
      getByText,
      getByLabelText
    } = renderWithPasswordResetStore(<RequestStep />, { setEmail })
    const email = getByLabelText(/email address/i)
    const submitButton = getByText(/reset/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(submitButton.parentElement).toBeEnabled()
    fireEvent.click(submitButton)
    expect(submitButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(setEmail).toHaveBeenCalledWith(requestPasswordResetArgs.email)
      expect(requestReset).toHaveBeenCalledWith(requestPasswordResetArgs)
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = renderWithPasswordResetStore(<RequestStep />)
    const backToLogin = getByText(/back to login/i)

    fireEvent.click(backToLogin)
    expect(history.location.pathname).toBe('/auth/login')
  })
})
