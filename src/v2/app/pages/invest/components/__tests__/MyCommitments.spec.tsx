/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { MyCommitments } from 'v2/app/pages/invest/components/MyCommitments'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import columns from 'v2/app/pages/invest/components/columns'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('MyCommitments', () => {
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
    render(<MyCommitments />)
  })

  it('renders TableView with correct props', () => {
    render(<MyCommitments />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      {
        uri: `/issuance/commitments/list/${user._id}`,
        name: `commitments-${user._id}`,
        columns,
        hasActions: true,
        actions: expect.anything()
      },
      {}
    )
  })
})
