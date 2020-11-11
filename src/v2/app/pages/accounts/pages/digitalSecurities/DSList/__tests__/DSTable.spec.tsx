/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTable } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTable'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
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
    const name = `ds-${user._id}`

    render(<DSTable />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name, columns }),
      {}
    )
  })
})
