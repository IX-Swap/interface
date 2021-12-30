import React from 'react'
import { render } from 'test-utils'
import { RecentDeposits } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { balance } from '__fixtures__/balance'
import { user } from '__fixtures__/user'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/columns'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { generatePath, Route } from 'react-router-dom'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('RecentDeposits', () => {
  beforeEach(() => {
    history.push(generatePath(DSRoute.deposit, { balanceId: balance.assetId }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<RecentDeposits />)
  })

  it('renders TableView with correct props', () => {
    const userId = user._id
    jest.spyOn(useAuthHook, 'useAuth').mockImplementation(() => ({
      user,
      isAuthenticated: true
    }))
    const uri = `/accounts/security/deposits/list/${userId}`
    const name = digitalSecuritiesQueryKeys.getDepositByUserId(userId)

    render(
      <Route path={DSRoute.deposit}>
        <RecentDeposits />
      </Route>
    )

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri,
        name,
        columns
      }),
      {}
    )
  })
})
