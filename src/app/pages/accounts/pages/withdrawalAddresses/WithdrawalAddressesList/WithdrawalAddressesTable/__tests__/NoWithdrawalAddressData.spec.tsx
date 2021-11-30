import React from 'react'
import { render, cleanup } from 'test-utils'
import { NoWithdrawalAddressData } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/NoWithdrawalAddressData'

describe('NoWithdrawalAddressData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NoWithdrawalAddressData />)
  })
})
