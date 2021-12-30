import { AchCredits } from 'app/pages/accounts/components/VirtualAccountCashDeposit/AchCredit'
import React from 'react'
import { render } from 'test-utils'

describe('AchCredit', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AchCredits />)
  })
})
