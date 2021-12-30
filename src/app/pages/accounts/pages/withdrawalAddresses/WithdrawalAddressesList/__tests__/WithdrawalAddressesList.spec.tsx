import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddressesList } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesList'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'

jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable',
  () => ({ WithdrawalAddressesTable: jest.fn(() => null) })
)

describe('WithdrawalAddressesList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<WithdrawalAddressesList />)
  })

  it.skip('renders withdrawalAddressesTable', () => {
    render(<WithdrawalAddressesList />)

    expect(WithdrawalAddressesTable).toHaveBeenCalled()
  })
})
