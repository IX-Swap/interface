import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { DepositView } from 'app/pages/accounts/pages/banks/DepositCash/DepositView'
import { Setup } from 'app/pages/accounts/pages/banks/DepositCash/Setup'
import { Preview } from 'app/pages/accounts/pages/banks/DepositCash/Preview'
import { BackButton } from 'app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'app/pages/accounts/pages/banks/DepositCash/ContinueButton'
// import { BankDetails } from 'app/components/BankDetails'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'
import { AlertAndOTP } from 'app/pages/accounts/pages/banks/components/AlertAndOTP'

jest.mock('app/pages/accounts/pages/banks/DepositCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/banks/components/DepositCashAlert',
  () => ({
    DepositCashAlert: jest.fn(() => null)
  })
)

jest.mock('app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/SuccessView', () => ({
  SuccessView: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/AlertAndOTP', () => ({
  AlertAndOTP: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/ResetButton', () => ({
  ResetButton: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/DepositCash/Preview', () => ({
  Preview: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/banks/DepositCash/ContinueButton',
  () => ({
    ContinueButton: jest.fn(() => null)
  })
)

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct components on the SETUP step', () => {
    const { queryByText } = renderWithDepositStore(<DepositView />, {
      isSetup: true
    })

    expect(Setup).toBeCalled()
    // expect(BankDetails).toBeCalled()
    expect(ContinueButton).toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(BackButton).not.toBeCalled()
    expect(ResetButton).not.toBeCalled()
    expect(queryByText('Confirm Deposit')).toBeFalsy()
    expect(AlertAndOTP).not.toBeCalled()
  })

  it('renders correct components on the PREVIEW step', () => {
    const { queryByText } = renderWithDepositStore(<DepositView />, {
      isPreview: true
    })

    expect(Setup).toBeCalled()
    // expect(BankDetails).toBeCalled()
    expect(ContinueButton).not.toBeCalled()
    expect(Preview).toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(BackButton).toBeCalled()
    expect(ResetButton).not.toBeCalled()
    expect(queryByText('Confirm Deposit')).toBeTruthy()
    expect(AlertAndOTP).toBeCalled()
  })

  it('renders correct components on the SUCCESS step', () => {
    const { queryByText } = renderWithDepositStore(<DepositView />, {
      isSuccess: true
    })

    expect(Setup).not.toBeCalled()
    // expect(BankDetails).not.toBeCalled()
    expect(ContinueButton).not.toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).toBeCalled()
    expect(BackButton).not.toBeCalled()
    expect(ResetButton).toBeCalled()
    expect(queryByText('Confirm Deposit')).toBeFalsy()
    expect(AlertAndOTP).not.toBeCalled()
  })
})
