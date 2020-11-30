import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { DepositView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'

import { DSDeposit } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits',
  () => ({ RecentDeposits: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView',
  () => ({ DepositView: jest.fn(() => null) })
)

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSDeposit />)
  })

  it('renders RecentDeposits & DepositView', () => {
    render(<DSDeposit />)

    expect(RecentDeposits).toHaveBeenCalledTimes(1)
    expect(DepositView).toHaveBeenCalledTimes(1)
  })
})
