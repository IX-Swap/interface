import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCash } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash'

jest.mock(
  'app/pages/accounts/pages/banks/pages/DepositCash/DepositView',
  () => ({
    DepositView: () => <div data-testid='deposit-view'></div>
  })
)

jest.mock(
  'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits',
  () => ({
    RecentDeposits: () => <div data-testid='recent-deposits'></div>
  })
)

describe('DepositCash', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders DepositView and RecentDeposits without error', () => {
    const { queryByTestId } = render(<DepositCash />)

    const depositView = queryByTestId('deposit-view')
    const recentDeposits = queryByTestId('recent-deposits')

    expect(depositView).not.toBeNull()
    expect(recentDeposits).not.toBeNull()
  })
})
