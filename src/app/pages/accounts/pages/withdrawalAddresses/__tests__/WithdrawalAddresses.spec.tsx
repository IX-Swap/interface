import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddresses'

describe('WithdrawalAddresses', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddresses />)
  })
})
