/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'
import { AssetView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView'
import { AssetInfo } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView',
  () => ({ AssetView: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo',
  () => ({ AssetInfo: jest.fn(() => null) })
)

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DepositView />)
  })

  it('renders BalancesList, AssetView & DSDepositInput', () => {
    render(<DepositView />)

    expect(AssetView).toHaveBeenCalledTimes(1)
    expect(AssetInfo).toHaveBeenCalledTimes(1)
  })
})
