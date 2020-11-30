import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'app/pages/accounts/pages/banks/DepositCash/RecentDeposits'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from '../columns'
import * as useAuthHook from 'hooks/auth/useAuth'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView' />)
}))

describe('RecentDeposits', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })
    const uri = `/accounts/cash/deposits/list/${user._id}`
    const name = `cash-deposits-${user._id}`

    render(<RecentDeposits />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name, columns }),
      {}
    )
  })
})
