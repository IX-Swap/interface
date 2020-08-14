/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, render } from 'test-utils'
import { cleanup } from '@testing-library/react'
import history from 'v2/history'
import ConfirmationStep from 'v2/auth/pages/password-reset/confirmation-step'

describe('ConfirmationStep', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it("renders text and 'Back to Login' button", () => {
    const { getByText } = render(<ConfirmationStep />)
    const text = getByText(/Your password has been successfully reset/)
    const backToLoginButton = getByText(/back to login/i)

    expect(text).toBeInTheDOM()
    expect(backToLoginButton).toBeInTheDOM()
    expect(backToLoginButton.parentElement).toBeEnabled()
  })

  it("handles click on 'Back to Login'", async () => {
    const { getByText } = render(<ConfirmationStep />)
    const backToLoginButton = getByText(/back to login/i)

    fireEvent.click(backToLoginButton)

    expect(history.location.pathname).toBe('/auth/login')
  })
})
