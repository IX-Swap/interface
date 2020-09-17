/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { WithdrawView } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawView'
import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'
import { WithdrawCashAlert } from 'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert'
import { CancelButton } from 'v2/app/pages/accounts/pages/banks/components/CancelButton'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'

jest.mock('v2/app/pages/accounts/pages/banks/components/CancelButton', () => ({
  CancelButton: jest.fn(() => null)
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton',
  () => ({
    ContinueButton: jest.fn(() => null)
  })
)

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview', () => ({
  BankPreview: jest.fn(() => null)
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert',
  () => ({
    WithdrawCashAlert: jest.fn(() => null)
  })
)

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/Preview', () => ({
  Preview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/WithdrawCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Setup and ContinueButton if preview is false', () => {
    const { queryByText } = renderWithDepositStore(<WithdrawView />, {
      isPreview: false
    })

    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(1)
    expect(ContinueButton).toHaveBeenCalledTimes(1)

    expect(Preview).toHaveBeenCalledTimes(0)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(0)
    expect(CancelButton).toHaveBeenCalledTimes(0)
    expect(queryByText('Confirm Withdrawal')).toBeFalsy()
  })

  it('renders Preview,OTP,WithdrawCashAlert,BankPreview if preview is true', () => {
    const { queryByText } = renderWithDepositStore(<WithdrawView />, {
      isPreview: true
    })

    expect(Setup).toHaveBeenCalledTimes(0)
    expect(ContinueButton).toHaveBeenCalledTimes(0)

    expect(Preview).toHaveBeenCalledTimes(1)
    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(1)
    expect(CancelButton).toHaveBeenCalledTimes(1)
    expect(queryByText('Confirm Withdrawal')).toBeTruthy()
  })
})
