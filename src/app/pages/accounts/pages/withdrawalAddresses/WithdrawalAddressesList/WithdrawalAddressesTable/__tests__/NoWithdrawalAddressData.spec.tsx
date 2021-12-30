import React from 'react'
import { render } from 'test-utils'
import { NoWithdrawalAddressData } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/NoWithdrawalAddressData'

describe('NoWithdrawalAddressData', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NoWithdrawalAddressData />)
  })
})
