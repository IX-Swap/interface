import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressesTable } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { user } from '__fixtures__/user'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

describe('WithdrawalAddressesTable', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressesTable />)
  })
})
