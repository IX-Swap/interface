import React from 'react'
import PasswordReset from 'v2/auth/PasswordReset/PasswordReset'
import { renderWithPasswordResetStore } from 'test-utils'
import { cleanup } from '@testing-library/react'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

jest.mock('../RequestStep.tsx', () => () => <div data-testid='request' />)
jest.mock('../ResetStep.tsx', () => () => <div data-testid='reset' />)
jest.mock('../ConfirmationStep.tsx', () => () => (
  <div data-testid='confirmation' />
))

describe('PasswordReset', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders RequestStep if currentStep is PasswordResetStep.Request', () => {
    const store = { currentStep: PasswordResetStep.Request }
    const { getByTestId } = renderWithPasswordResetStore(
      <PasswordReset />,
      store
    )

    expect(getByTestId('request')).toBeTruthy()
  })

  it('renders ResetStep if currentStep is PasswordResetStep.Reset', () => {
    const store = { currentStep: PasswordResetStep.Reset }
    const { getByTestId } = renderWithPasswordResetStore(
      <PasswordReset />,
      store
    )

    expect(getByTestId('reset')).toBeTruthy()
  })

  it('renders ConfirmationStep if currentStep is PasswordResetStep.Confirmation', () => {
    const store = { currentStep: PasswordResetStep.Confirmation }
    const { getByTestId } = renderWithPasswordResetStore(
      <PasswordReset />,
      store
    )

    expect(getByTestId('confirmation')).toBeTruthy()
  })

  it('renders nothing if currentStep is something else', () => {
    const store = { currentStep: undefined }
    const { container } = renderWithPasswordResetStore(<PasswordReset />, store)

    expect(container).toBeEmpty()
  })
})
