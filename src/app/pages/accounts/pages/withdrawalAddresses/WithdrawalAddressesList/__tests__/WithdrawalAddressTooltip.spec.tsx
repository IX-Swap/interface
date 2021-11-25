import { WithdrawalAddressTooltip } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressTooltip'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('WithdrawalAddressTooltip', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<WithdrawalAddressTooltip />)
  })
})
