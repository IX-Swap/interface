import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/WithdrawCash/WithdrawCash'
import { RecentWithdrawals } from 'app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals'
import { WithdrawView } from 'app/pages/accounts/pages/banks/WithdrawCash/WithdrawView'

jest.mock(
  'app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals',
  () => ({
    RecentWithdrawals: jest.fn(() => (
      <div data-testid='RecentWithdrawals'></div>
    ))
  })
)

jest.mock('app/pages/accounts/pages/banks/WithdrawCash/WithdrawView', () => ({
  WithdrawView: jest.fn(() => <div data-testid='WithdrawView'></div>)
}))

describe('WithdrawCash', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders RecentWithdrawals and WithdrawView without error', () => {
    const { getByTestId } = render(<WithdrawCash />)

    const recentWithdrawls = getByTestId('RecentWithdrawals')
    expect(RecentWithdrawals).toHaveBeenCalledTimes(1)

    const withdrawView = getByTestId('WithdrawView')
    expect(WithdrawView).toHaveBeenCalledTimes(1)

    expect(recentWithdrawls).toBeTruthy()
    expect(withdrawView).toBeTruthy()
  })
})
