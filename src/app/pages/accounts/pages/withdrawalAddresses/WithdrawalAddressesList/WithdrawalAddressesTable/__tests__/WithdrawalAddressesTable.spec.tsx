import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { user } from '__fixtures__/user'
import * as useAuthHook from 'hooks/auth/useAuth'

describe('WithdrawalAddressesTable', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<WithdrawalAddressesTable />)
  })
})
