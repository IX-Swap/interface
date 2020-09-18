/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'

import { AssetView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView'
import { BalancesList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList'
import { DSDepositInput } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView',
  () => ({ AssetView: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/BalancesList',
  () => ({ BalancesList: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/Setup',
  () => ({ DSDepositInput: jest.fn(() => null) })
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
    expect(BalancesList).toHaveBeenCalledTimes(1)
    expect(DSDepositInput).toHaveBeenCalledTimes(1)
  })
})
