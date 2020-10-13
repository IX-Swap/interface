/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { history } from 'v2/history'
import { balance } from '__fixtures__/balance'
import { user } from '__fixtures__/user'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
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
