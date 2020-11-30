import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { balance } from '__fixtures__/balance'
import { user } from '__fixtures__/user'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('RecentDeposits', () => {
  beforeEach(() => {
    history.push('/', { balanceId: balance.assetId })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RecentDeposits />)
  })

  it('renders TableView with correct props', () => {
    const userId = user._id
    jest.spyOn(useAuthHook, 'useAuth').mockImplementation(() => ({
      user,
      isAuthenticated: true
    }))
    const uri = `/accounts/security/deposits/list/${userId}`
    const name = `ds-deposits-${userId}`

    render(<RecentDeposits />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri,
        name,
        columns,
        filter: { asset: balance.assetId }
      }),
      {}
    )
  })
})
