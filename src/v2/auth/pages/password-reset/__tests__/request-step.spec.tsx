/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, render, waitFor } from 'test-utils'
import RequestStep, {
  requestPasswordResetInitialValues
} from 'v2/auth/pages/password-reset/request-step'
import { cleanup } from '@testing-library/react'
import { requestPasswordResetArgs } from '__fixtures__/auth'
import history from 'v2/history'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'

jest.mock('v2/auth/context/password-reset')

// FIXME
const usePasswordResetStoreMocked = (usePasswordResetStore as unknown) as jest.Mock<
  Partial<ReturnType<typeof usePasswordResetStore>>
>

usePasswordResetStoreMocked.mockReturnValue({
  requestReset: jest.fn()
})

describe('RequestStep', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders the form with correct default values and disabled button', () => {
    const { getByTestId, getByText } = render(<RequestStep />)
    const form = getByTestId('request-step')
    const submitButton = getByText(/reset/i)

    expect(form).toBeInTheDOM()
    expect(form).toHaveFormValues(requestPasswordResetInitialValues)
    expect(submitButton.parentElement).toBeDisabled()
  })

  it('handles user input', () => {
    const { getByPlaceholderText, getByTestId } = render(<RequestStep />)
    const form = getByTestId('request-step')
    const email = getByPlaceholderText(/email/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(form).toHaveFormValues(requestPasswordResetArgs)
  })

  it('handles email validation', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <RequestStep />
    )
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
      expect(getByText('email must be a valid email')).toBeTruthy()
    })
  })

  it('handles submit', async () => {
    const passwordResetStore = usePasswordResetStoreMocked()
    const { getByText, getByPlaceholderText } = render(<RequestStep />)
    const email = getByPlaceholderText(/email address/i)
    const submitButton = getByText(/reset/i)

    fireEvent.change(email, {
      target: { value: requestPasswordResetArgs.email }
    })

    expect(submitButton.parentElement).toBeEnabled()
    fireEvent.click(submitButton)
    expect(submitButton.parentElement).toBeDisabled()

    await waitFor(() => {
      expect(passwordResetStore.requestReset).toHaveBeenCalledTimes(1)
      expect(passwordResetStore.requestReset).toHaveBeenCalledWith(
        requestPasswordResetArgs
      )
    })
  })

  it('handles click on "Forgot Password?"', async () => {
    const { getByText } = render(<RequestStep />)
    const backToLogin = getByText(/back to login/i)

    fireEvent.click(backToLogin)
    expect(history.location.pathname).toBe('/auth/login')
  })
})
