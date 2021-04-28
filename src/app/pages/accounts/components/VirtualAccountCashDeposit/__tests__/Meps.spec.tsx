import { Meps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Meps'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Meps', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Meps />)
  })
})
