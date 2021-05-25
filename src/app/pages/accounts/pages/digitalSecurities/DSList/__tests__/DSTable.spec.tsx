import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTable } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTable'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { digitalSecuritiesQueryKeys } from 'config/queryKeys'

jest.mock('__tests__/TableWithPagination/TableView', () => ({
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSTable />)
  })

  it('renders TableView with correct props', () => {
    const uri = `/accounts/balance/${user._id}`
    const name = digitalSecuritiesQueryKeys.getByUserId(user._id)

    render(<DSTable />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name, columns }),
      {}
    )
  })
})
