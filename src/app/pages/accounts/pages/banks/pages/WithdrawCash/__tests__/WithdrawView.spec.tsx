import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { WithdrawView } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView'
import { Setup } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Setup'
import { Preview } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Preview'
import { WithdrawCashAlert } from 'app/pages/accounts/pages/banks/components/WithdrawCashAlert'
import { BackButton } from 'app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton'
import { BankPreview } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/BankPreview'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'

jest.mock('app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton',
  () => ({
    ContinueButton: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/banks/pages/WithdrawCash/BankPreview',
  () => ({
    BankPreview: jest.fn(() => null)
  })
)

jest.mock('app/pages/accounts/pages/banks/components/SuccessView', () => ({
  SuccessView: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/ResetButton', () => ({
  ResetButton: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/banks/components/WithdrawCashAlert',
  () => ({
    WithdrawCashAlert: jest.fn(() => null)
  })
)

jest.mock('app/pages/accounts/pages/banks/pages/WithdrawCash/Preview', () => ({
  Preview: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/pages/WithdrawCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct __tests__ on the SETUP step', () => {
    const {
      queryByText,
      queryByLabelText
    } = renderWithDepositStore(<WithdrawView />, { isSetup: true })

    expect(Setup).toBeCalled()
    expect(ContinueButton).toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(WithdrawCashAlert).not.toBeCalled()
    expect(BackButton).not.toBeCalled()
    expect(ResetButton).not.toBeCalled()
    expect(queryByText('Confirm Withdrawal')).toBeFalsy()
    expect(queryByLabelText('2-Factor Auth Code')).toBeFalsy()
  })

  it('renders correct __tests__ on the PREVIEW step', () => {
    const { queryByText } = renderWithDepositStore(<WithdrawView />, {
      isPreview: true
    })

    expect(Setup).toBeCalled()
    expect(ContinueButton).not.toBeCalled()
    expect(Preview).toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(WithdrawCashAlert).toBeCalled()
    expect(BackButton).toBeCalled()
    expect(ResetButton).not.toBeCalled()
    expect(queryByText('Confirm Withdrawal')).toBeTruthy()
    expect(queryByText('2-Factor Auth Code')).toBeTruthy()
  })

  it('renders correct __tests__ on the SUCCESS step', () => {
    const {
      queryByText,
      queryByLabelText
    } = renderWithDepositStore(<WithdrawView />, { isSuccess: true })

    expect(Setup).not.toBeCalled()
    expect(BankPreview).not.toBeCalled()
    expect(ContinueButton).not.toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).toBeCalled()
    expect(WithdrawCashAlert).not.toBeCalled()
    expect(BackButton).not.toBeCalled()
    expect(ResetButton).toBeCalled()
    expect(queryByText('Confirm Withdrawal')).toBeFalsy()
    expect(queryByLabelText('2-Factor Auth Code')).toBeFalsy()
  })
})
