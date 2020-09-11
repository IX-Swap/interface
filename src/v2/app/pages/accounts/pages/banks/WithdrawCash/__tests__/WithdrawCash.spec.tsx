/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawCash } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawCash'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals'
import { WithdrawView } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawView'

jest.mock(
  'v2/app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals',
  () => ({
    RecentWithdrawals: jest.fn(() => (
      <div data-testid='RecentWithdrawals'></div>
    ))
  })
)

jest.mock(
  'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawView',
  () => ({
    WithdrawView: jest.fn(() => <div data-testid='WithdrawView'></div>)
  })
)

describe('WithdrawCash', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    const { getByTestId } = render(<WithdrawCash />)

    const input1 = getByTestId('RecentWithdrawals')
    expect(RecentWithdrawals).toHaveBeenCalledTimes(1)

    const input2 = getByTestId('WithdrawView')
    expect(WithdrawView).toHaveBeenCalledTimes(1)

    expect(input1).toBeTruthy()
    expect(input2).toBeTruthy()
  })
})
