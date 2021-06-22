import { AchCredits } from 'app/pages/accounts/components/VirtualAccountCashDeposit/AchCredit'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AchCredit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AchCredits />)
  })
})
