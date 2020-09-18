/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView'
import * as banksContext from 'v2/app/pages/accounts/pages/banks/context'

import { DSDepositInput } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup'
import { BalancesList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList'
import { Preview } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Setup } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup',
  () => ({
    DSDepositInput: jest.fn(() => null)
  })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList',
  () => ({
    BalancesList: jest.fn(() => null)
  })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview',
  () => ({
    Preview: jest.fn(() => null)
  })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup',
  () => ({
    Setup: jest.fn(() => null)
  })
)

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(banksContext, 'useDepositStore').mockImplementation(() => ({
      isPreview: true
    }))
    render(<WithdrawView />)
  })

  it('renders DSDepositInput & BalancesList', () => {
    jest.spyOn(banksContext, 'useDepositStore').mockImplementation(() => ({
      isPreview: true
    }))
    render(<WithdrawView />)

    expect(DSDepositInput).toHaveBeenCalledTimes(1)
    expect(BalancesList).toHaveBeenCalledTimes(1)
  })

  it('renders Preview if isPreview is true', () => {
    jest.spyOn(banksContext, 'useDepositStore').mockImplementation(() => ({
      isPreview: true
    }))
    render(<WithdrawView />)

    expect(Preview).toHaveBeenCalledTimes(1)

    expect(Setup).toHaveBeenCalledTimes(0)
  })

  it('renders Preview if isPreview is false', () => {
    jest.spyOn(banksContext, 'useDepositStore').mockImplementation(() => ({
      isPreview: false
    }))
    render(<WithdrawView />)

    expect(Setup).toHaveBeenCalledTimes(1)

    expect(Preview).toHaveBeenCalledTimes(0)
  })
})
