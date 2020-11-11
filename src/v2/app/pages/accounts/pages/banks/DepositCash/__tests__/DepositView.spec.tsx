/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { BackButton } from 'v2/app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'
// import { BankDetails } from 'v2/app/components/BankDetails'
import { SuccessView } from 'v2/app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'v2/app/pages/accounts/pages/banks/components/ResetButton'
import { AlertAndOTP } from 'v2/app/pages/accounts/pages/banks/components/AlertAndOTP'

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/components/DepositCashAlert',
  () => ({
    DepositCashAlert: jest.fn(() => null)
  })
)

jest.mock('v2/app/components/BankDetails', () => ({
  BankDetails: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/components/SuccessView', () => ({
  SuccessView: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/components/AlertAndOTP', () => ({
  AlertAndOTP: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/components/ResetButton', () => ({
  ResetButton: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Preview', () => ({
  Preview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/accounts/pages/banks/components/BackButton', () => ({
  BackButton: jest.fn(() => null)
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton',
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
