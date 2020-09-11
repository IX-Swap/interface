/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals'

describe('RecentWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<RecentWithdrawals />)
  })
})
