import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddresses'

describe('WithdrawalAddresses', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<WithdrawalAddresses />)
  })
})
