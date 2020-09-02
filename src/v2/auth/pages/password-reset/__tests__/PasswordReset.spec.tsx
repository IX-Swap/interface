import React from 'react'
import { PasswordReset } from 'v2/auth/pages/password-reset/PasswordReset'
import { renderWithPasswordResetStore } from 'test-utils'
import { cleanup } from '@testing-library/react'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { RequestStep } from 'v2/auth/pages/password-reset/RequestStep'
import { ResetStep } from 'v2/auth/pages/password-reset/ResetStep'
import { ConfirmationStep } from 'v2/auth/pages/password-reset/ConfirmationStep'

jest.mock('../RequestStep.tsx', () => ({ RequestStep: jest.fn(() => null) }))
jest.mock('../ResetStep.tsx', () => ({ ResetStep: jest.fn(() => null) }))
jest.mock('../ConfirmationStep.tsx', () => ({
  ConfirmationStep: jest.fn(() => null)
}))

describe('PasswordReset', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders RequestStep if currentStep is PasswordResetStep.Request', () => {
    const store = { currentStep: PasswordResetStep.Request }

    renderWithPasswordResetStore(<PasswordReset />, store)

    expect(RequestStep).toHaveBeenCalledTimes(1)
  })

  it('renders ResetStep if currentStep is PasswordResetStep.Reset', () => {
    const store = { currentStep: PasswordResetStep.Reset }

    renderWithPasswordResetStore(<PasswordReset />, store)

    expect(ResetStep).toHaveBeenCalledTimes(1)
  })

  it('renders ConfirmationStep if currentStep is PasswordResetStep.Confirmation', () => {
    const store = { currentStep: PasswordResetStep.Confirmation }

    renderWithPasswordResetStore(<PasswordReset />, store)

    expect(ConfirmationStep).toBeTruthy
  })

  it('renders nothing if currentStep is something else', () => {
    const store = { currentStep: undefined }
    const { container } = renderWithPasswordResetStore(<PasswordReset />, store)

    expect(container).toBeEmpty()
  })
})
