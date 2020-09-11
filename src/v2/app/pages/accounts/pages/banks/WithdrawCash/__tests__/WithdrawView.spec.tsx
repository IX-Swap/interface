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

  it('renders setup if preview is false', () => {
    useDepositStore.mockReturnValue({
      isPreview: false
    })
    render(<WithdrawView />)

    expect(Preview).toHaveBeenCalledTimes(0)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(0)
    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(1)
  })

  it('renders setup if preview is true', () => {
    useDepositStore.mockReturnValue({
      isPreview: true
    })
    render(<WithdrawView />)

    expect(Preview).toHaveBeenCalledTimes(1)
    expect(BankPreview).toHaveBeenCalledTimes(1)
    expect(WithdrawCashAlert).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(0)
  })
})
