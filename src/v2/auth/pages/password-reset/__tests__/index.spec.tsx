import React from 'react'
import PasswordReset from 'v2/auth/pages/password-reset/index'
import { render } from 'test-utils'
import { cleanup } from '@testing-library/react'
import * as passwordResetContext from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

jest.mock('../request-step.tsx', () => () => <div data-testid='request' />)
jest.mock('../reset-step.tsx', () => () => <div data-testid='reset' />)
jest.mock('../confirmation-step.tsx', () => () => (
  <div data-testid='confirmation' />
))

const usePasswordResetStoreMock = jest.spyOn(
  passwordResetContext,
  'usePasswordResetStore'
) as jest.SpyInstance<
  Partial<ReturnType<typeof passwordResetContext.usePasswordResetStore>>
>

describe('PasswordReset', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('renders', () => {
    const { container } = render(<PasswordReset />)

    expect(container).toBeInTheDOM()
  })

  it('renders RequestStep if currentStep is PasswordResetStep.Request', () => {
    usePasswordResetStoreMock.mockReturnValue({
      currentStep: PasswordResetStep.Request
    })

    const { getByTestId } = render(<PasswordReset />)

    expect(getByTestId('request')).toBeTruthy()
  })

  it('renders ResetStep if currentStep is PasswordResetStep.Reset', () => {
    usePasswordResetStoreMock.mockReturnValue({
      currentStep: PasswordResetStep.Reset
    })

    const { getByTestId } = render(<PasswordReset />)

    expect(getByTestId('reset')).toBeTruthy()
  })

  it('renders ConfirmationStep if currentStep is PasswordResetStep.Confirmation', () => {
    usePasswordResetStoreMock.mockReturnValue({
      currentStep: PasswordResetStep.Confirmation
    })

    const { getByTestId } = render(<PasswordReset />)

    expect(getByTestId('confirmation')).toBeTruthy()
  })

  it('renders nothing if currentStep is something else', () => {
    usePasswordResetStoreMock.mockReturnValue({
      currentStep: ('' as unknown) as PasswordResetStep
    })

    const { container } = render(<PasswordReset />)

    expect(container).toBeEmpty()
  })
})
