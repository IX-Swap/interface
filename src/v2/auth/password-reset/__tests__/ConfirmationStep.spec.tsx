/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { fireEvent, renderWithUserStore } from 'test-utils'
import { cleanup } from '@testing-library/react'
import history from 'v2/history'
import { ConfirmationStep } from 'v2/auth/password-reset/ConfirmationStep'

describe('ConfirmationStep', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it("renders text and 'Back to Login' button", () => {
    const { getByText } = renderWithUserStore(<ConfirmationStep />)
    const text = getByText(/Your password has been successfully reset/)
    const backToLoginButton = getByText(/back to login/i)

    expect(text).toBeInTheDOM()
    expect(backToLoginButton).toBeInTheDOM()
    expect(backToLoginButton.parentElement).toBeEnabled()
  })

  it("handles click on 'Back to Login'", async () => {
    const { getByText } = renderWithUserStore(<ConfirmationStep />)
    const backToLoginButton = getByText(/back to login/i)

    fireEvent.click(backToLoginButton)

    expect(history.location.pathname).toBe('/auth/login')
  })
})
