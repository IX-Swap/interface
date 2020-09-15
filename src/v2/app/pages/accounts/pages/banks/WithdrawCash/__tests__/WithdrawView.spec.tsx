/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawView } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawView'

import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { WithdrawCashAlert } from 'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert'

jest.mock('v2/app/pages/accounts/pages/banks/context')
jest.mock('v2/app/pages/accounts/pages/banks/components/OTP', () => ({
  OTP: () => <div data-testid='otp'></div>
}))
jest.mock('v2/app/pages/accounts/pages/banks/components/CancelButton', () => ({
  CancelButton: () => <div data-testid='cancel-button'></div>
}))
jest.mock('v2/components/form/SubmitButton', () => ({
  SubmitButton: () => <div data-testid='submit-button'></div>
}))
jest.mock(
  'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton',
  () => ({
    ContinueButton: () => <div data-testid='continue-button'></div>
  })
)

const useDepositStoreMock = useDepositStore as jest.Mock<
  Partial<ReturnType<typeof useDepositStore>>
>

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview', () => {
  const BankPreview = jest.fn(() => <div data-testid='bank-preview'></div>)
  return { BankPreview }
})

jest.mock(
  'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert',
  () => {
    const WithdrawCashAlert = jest.fn(() => (
      <div data-testid='withdraw-cash-alert'></div>
    ))
    return { WithdrawCashAlert }
  }
)

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/Preview', () => {
  const Preview = jest.fn(() => <div data-testid='preview'></div>)
  return { Preview }
})

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/Setup', () => {
  const Setup = jest.fn(() => <div data-testid='setup'></div>)
  return { Setup }
})

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Setup and ContinueButton if preview is false', () => {
    useDepositStoreMock.mockReturnValue({
      isPreview: false
    })
    const { queryByTestId } = render(<WithdrawView />)

    expect(Preview).toHaveBeenCalledTimes(0)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(0)
    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(1)

    expect(queryByTestId('cancel-button')).toBeNull()
    expect(queryByTestId('submit-button')).toBeNull()
    expect(queryByTestId('continue-button')).not.toBeNull()
    expect(queryByTestId('otp')).toBeNull()
  })

  it('renders Preview,OTP,WithdrawCashAlert,BankPreview if preview is true', () => {
    useDepositStoreMock.mockReturnValue({
      isPreview: true
    })
    const { queryByTestId } = render(<WithdrawView />)

    expect(Preview).toHaveBeenCalledTimes(1)
    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(0)

    expect(queryByTestId('cancel-button')).not.toBeNull()
    expect(queryByTestId('submit-button')).not.toBeNull()
    expect(queryByTestId('continue-button')).toBeNull()
    expect(queryByTestId('otp')).not.toBeNull()
  })
})
