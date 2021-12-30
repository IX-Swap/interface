import React from 'react'
import { render } from 'test-utils'
import { DSTable } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTable'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('DSTable', () => {
  beforeEach(() => {
    jest.spyOn(useAuthHook, 'useAuth').mockImplementation(() => ({
      user,
      isAuthenticated: true
    }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    const uri = accountsURL.balance.getAll(user._id)
    const name = digitalSecuritiesQueryKeys.getByUserId(user._id)

    render(<DSTable />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name, columns }),
      {}
    )
  })
})
