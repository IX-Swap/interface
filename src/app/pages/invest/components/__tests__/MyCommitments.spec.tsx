import React from 'react'
import { render } from 'test-utils'
import { MyCommitments } from 'app/pages/invest/components/MyCommitments'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import columns from 'app/pages/invest/components/columns'
import * as useAuthHook from 'hooks/auth/useAuth'
import { investQueryKeys } from 'config/queryKeys'

jest.mock('components/TableWithPagination/TableView', () => ({
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
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<MyCommitments />)
  })

  it('renders TableView with correct props', () => {
    render(<MyCommitments />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      {
        uri: `/issuance/commitments/list/${user._id}`,
        name: investQueryKeys.getCommitmentsByUserId(user._id),
        columns,
        hasActions: true,
        actions: expect.anything()
      },
      {}
    )
  })
})
