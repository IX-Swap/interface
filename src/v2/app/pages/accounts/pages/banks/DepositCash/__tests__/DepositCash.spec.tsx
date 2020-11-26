import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCash } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositCash'

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/DepositView', () => ({
  DepositView: () => <div data-testid='deposit-view'></div>
}))
jest.mock(
  'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits',
  () => ({ RecentDeposits: () => <div data-testid='recent-deposits'></div> })
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
