/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from '../columns'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView' />)
}))

describe('RecentDeposits', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders TableView with props correctly', () => {
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
