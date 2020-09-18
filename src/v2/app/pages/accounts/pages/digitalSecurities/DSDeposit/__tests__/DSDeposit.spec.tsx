/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { DepositView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView'

import { DSDeposit } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits',
  () => ({
    RecentDeposits: jest.fn(() => <div data-testid='RecentDeposits'></div>)
  })
)
jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositView',
  () => ({
    DepositView: jest.fn(() => <div data-testid='DepositView'></div>)
  })
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
    const { queryByTestId } = render(<DSDeposit />)

    expect(RecentDeposits).toHaveBeenCalledTimes(1)
    expect(DepositView).toHaveBeenCalledTimes(1)
  })
})
