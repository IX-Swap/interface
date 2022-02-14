import React from 'react'
import { PasswordReset } from 'auth/pages/password-reset/PasswordReset'
import { renderWithPasswordResetStore } from 'test-utils'
import {} from '@testing-library/react'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { RequestStep } from 'auth/pages/password-reset/RequestStep'
import { ResetStep } from 'auth/pages/password-reset/ResetStep'

jest.mock('../RequestStep.tsx', () => ({ RequestStep: jest.fn(() => null) }))
jest.mock('../ResetStep.tsx', () => ({ ResetStep: jest.fn(() => null) }))

describe('PasswordReset', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders RequestStep if currentStep is PasswordResetStep.Request', () => {
    const store = { currentStep: PasswordResetStep.Request }

    renderWithPasswordResetStore(<PasswordReset />, store)

    expect(RequestStep).toHaveBeenCalled()
  })

  it('renders ResetStep if currentStep is PasswordResetStep.Reset', () => {
    const store = { currentStep: PasswordResetStep.Reset }

    renderWithPasswordResetStore(<PasswordReset />, store)

    expect(ResetStep).toHaveBeenCalled()
  })

  it('renders nothing if currentStep is something else', () => {
    const store = { currentStep: undefined }
    const { container } = renderWithPasswordResetStore(<PasswordReset />, store)

    expect(container).toBeEmpty()
  })
})
