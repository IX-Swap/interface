import React from 'react'
import { render, cleanup } from 'test-utils'
import { WAFormWrapper } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper'

describe('WAFormWrapper', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WAFormWrapper />)
  })
})
