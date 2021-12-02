import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'

import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits',
  () => ({ RecentDeposits: jest.fn(() => null) })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm',
  () => ({ DepositForm: jest.fn(() => null) })
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
    expect(DepositForm).toHaveBeenCalledTimes(1)
  })
})
