/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import UserManagement from 'v2/app/pages/admin'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import columns from 'v2/app/pages/admin/columns'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('UserManagement', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserManagement />)
  })

  it('renders TableView with correct props', () => {
    render(<UserManagement />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'usersList',
        uri: '/auth/users/list',
        hasActions: true,
        columns
      }),
      {}
    )
  })
})
