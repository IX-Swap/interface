import React from 'react'
import { render } from 'test-utils'
import { Users, renderActions } from 'app/pages/admin/pages/Users'
import { TableView } from 'components/TableWithPagination/TableView'
import columns from 'app/pages/admin/columns'
import { user } from '__fixtures__/user'
import { Actions } from '../components/Actions'
import { usersQueryKeys } from 'config/queryKeys'
import { userURL } from 'config/apiURL'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Users', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    render(<Users />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: usersQueryKeys.getList,
        uri: userURL.getAll,
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
