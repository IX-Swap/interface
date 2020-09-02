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

describe('RequestStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
    const { getByTestId, getByText } = renderWithPasswordResetStore(
      <RequestStep />
    )
    const form = getByTestId('request-step')
    const submitButton = getByText(/reset/i)

    expect(form).toBeTruthy()
    expect(form).toHaveFormValues(requestPasswordResetInitialValues)
    expect(submitButton.parentElement).toBeDisabled()
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = renderWithPasswordResetStore(
      <RequestStep />
    )
    const form = getByTestId('request-step')
    const email = getByPlaceholderText(/email/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(form).toHaveFormValues(requestPasswordResetArgs)
  })

  it('handles email validation', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText
    } = renderWithPasswordResetStore(<RequestStep />)
    const email = getByPlaceholderText(/email address/i)
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
      expect(getByText('email must be a valid email')).toBeTruthy
    })
  })

  it('handles submit', async () => {
    const store = {
      requestReset: jest.fn()
    }
    const { getByText, getByPlaceholderText } = renderWithPasswordResetStore(
      <RequestStep />,
      store
    )
    const email = getByPlaceholderText(/email address/i)
    const submitButton = getByText(/reset/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(submitButton.parentElement).toBeEnabled()
    fireEvent.click(submitButton)
    expect(submitButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(store.requestReset).toHaveBeenCalledTimes(1)
      expect(store.requestReset).toHaveBeenCalledWith(requestPasswordResetArgs)
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = renderWithPasswordResetStore(<RequestStep />)
    const backToLogin = getByText(/back to login/i)

    fireEvent.click(backToLogin)
    expect(history.location.pathname).toBe('/auth/login')
  })
})
