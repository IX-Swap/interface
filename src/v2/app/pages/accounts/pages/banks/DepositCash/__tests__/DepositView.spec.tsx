/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositView'

import * as context from 'v2/app/pages/accounts/pages/banks/context'

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Setup', () => ({
  Setup: () => <div data-testid='setup'></div>
}))

jest.mock(
  'v2/app/pages/accounts/pages/banks/components/DepositCashAlert',
  () => ({
    DepositCashAlert: () => <div data-testid='deposit-cash-alert'></div>
  })
)
jest.mock('v2/app/pages/accounts/pages/banks/components/OTP', () => ({
  OTP: () => <div data-testid='otp'></div>
}))
jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/Preview', () => ({
  Preview: () => <div data-testid='preview'></div>
}))
jest.mock('v2/app/pages/accounts/pages/banks/components/CancelButton', () => ({
  CancelButton: () => <div data-testid='cancel-button'></div>
}))
jest.mock('v2/components/form/SubmitButton', () => ({
  SubmitButton: () => <div data-testid='submit-button'></div>
}))
jest.mock(
  'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton',
  () => ({
    ContinueButton: () => <div data-testid='continue-button'></div>
  })
)

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Setup and ContinueButton if preview is false', () => {
    jest.spyOn(context, 'useDepositStore').mockReturnValue({
      isPreview: false
    })

    const { queryByTestId } = render(<DepositView />)
    expect(queryByTestId('setup')).not.toBeNull()
    expect(queryByTestId('continue-button')).not.toBeNull()

    expect(queryByTestId('cancel-button')).toBeNull()
    expect(queryByTestId('submit-button')).toBeNull()
    expect(queryByTestId('otp')).toBeNull()
    expect(queryByTestId('preview')).toBeNull()
    expect(queryByTestId('deposit-cash-alert')).toBeNull()
  })

  it('renders DepositCashAlert,Preview, OTP, CancelButton and SubmitButton if preview is true', () => {
    jest.spyOn(context, 'useDepositStore').mockReturnValue({
      isPreview: true
    })

    const { queryByTestId } = render(<DepositView />)
    expect(queryByTestId('cancel-button')).not.toBeNull()
    expect(queryByTestId('submit-button')).not.toBeNull()
    expect(queryByTestId('otp')).not.toBeNull()
    expect(queryByTestId('preview')).not.toBeNull()
    expect(queryByTestId('deposit-cash-alert')).not.toBeNull()

    expect(queryByTestId('setup')).toBeNull()
    expect(queryByTestId('continue-button')).toBeNull()
  })
})
