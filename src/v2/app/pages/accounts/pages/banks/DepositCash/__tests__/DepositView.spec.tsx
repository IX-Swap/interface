/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { BackButton } from 'v2/app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/components/DepositCashAlert',
  () => ({
    DepositCashAlert: jest.fn(() => null)
  })
)

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

  it('renders Setup and ContinueButton if preview is false', () => {
    const { queryByLabelText, queryByText } = renderWithDepositStore(
      <DepositView />,
      {
        isPreview: false
      }
    )

    expect(Setup).toHaveBeenCalledTimes(1)
    expect(ContinueButton).toHaveBeenCalledTimes(1)

    expect(BackButton).toHaveBeenCalledTimes(0)
    expect(queryByText('Confirm Deposit')).toBeFalsy()
    expect(queryByLabelText('2-Factor Auth Code')).toBeFalsy()
    expect(Preview).toHaveBeenCalledTimes(0)
    expect(DepositCashAlert).toHaveBeenCalledTimes(0)
  })

  it('renders DepositCashAlert,Preview, OTP, CancelButton and SubmitButton if preview is true', () => {
    const {
      queryByLabelText,
      queryByText
    } = renderWithDepositStore(<DepositView />, { isPreview: true })

    expect(ContinueButton).toHaveBeenCalledTimes(0)

    expect(Setup).toHaveBeenCalledTimes(1)
    expect(BackButton).toHaveBeenCalledTimes(1)
    expect(queryByText('Confirm Deposit')).toBeTruthy()
    expect(queryByLabelText('2-Factor Auth Code')).toBeTruthy()
    expect(Preview).toHaveBeenCalledTimes(1)
    expect(DepositCashAlert).toHaveBeenCalledTimes(1)
  })
})
