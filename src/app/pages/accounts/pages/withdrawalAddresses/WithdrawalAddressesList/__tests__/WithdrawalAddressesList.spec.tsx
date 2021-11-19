import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressesList } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesList'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'

jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/WithdrawalAddressesTable',
  () => ({ WithdrawalAddressesTable: jest.fn(() => null) })
)

describe('WithdrawalAddressesList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressesList />)
  })

  it('renders WithdrawalAddressesTable', () => {
    render(<WithdrawalAddressesList />)

    expect(WithdrawalAddressesTable).toHaveBeenCalled()
  })
})
