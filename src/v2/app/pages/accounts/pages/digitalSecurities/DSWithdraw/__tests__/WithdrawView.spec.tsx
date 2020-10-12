/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { WithdrawView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView'
import { AssetInfo } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { Preview } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Setup } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo',
  () => ({ AssetInfo: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview',
  () => ({ Preview: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup',
  () => ({ Setup: jest.fn(() => null) })
)

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: true })
  })

  it('renders AssetInfo', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: true })

    expect(AssetInfo).toHaveBeenCalledTimes(1)
  })

  it('renders Preview if isPreview is true', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: true })

    expect(Preview).toHaveBeenCalledTimes(1)
    expect(Setup).toHaveBeenCalledTimes(1)
  })

  it('renders Preview if isPreview is false', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: false })

    expect(Setup).toHaveBeenCalledTimes(1)
    expect(Preview).toHaveBeenCalledTimes(0)
  })
})
