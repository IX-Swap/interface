/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits'

describe('RecentDeposits', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<RecentDeposits />)
  })
})
