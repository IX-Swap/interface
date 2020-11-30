import React from 'react'
import { render, cleanup } from 'test-utils'
import { CashDeposits } from 'v2/app/pages/authorizer/pages/cashDeposits/CashDeposits'

describe('CashDeposits', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CashDeposits />)
  })
})
