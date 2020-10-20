/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Users, renderActions } from 'v2/app/pages/admin/pages/Users'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import columns from 'v2/app/pages/admin/columns'
import { user } from '__fixtures__/user'
import { Actions } from '../components/Actions'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Users', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Users />)
  })

  it('renders TableView with correct props', () => {
    render(<Users />)

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

  describe('renderActions', () => {
    it('renders Actions component with correct data', () => {
      const ref = {} as any
      const actionsView = renderActions(user, ref)
      expect(actionsView).toEqual(<Actions user={user} ref={ref} />)
    })
  })
})
