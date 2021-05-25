import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentWithdrawals } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/RecentWithdrawals'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import * as useAuthHook from 'hooks/auth/useAuth'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'

jest.mock('__tests__/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView' />)
}))

describe('RecentWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user: user, isAuthenticated: true }))
    const uri = `/accounts/cash/withdrawals/list/${user._id}`
    const name = cashWithdrawalsQueryKeys.getByUserId(user._id)

    render(<RecentWithdrawals />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name }),
      {}
    )
  })
})
