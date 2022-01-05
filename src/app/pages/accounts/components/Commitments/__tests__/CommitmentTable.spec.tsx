import { CommitmentsTable } from 'app/pages/accounts/components/Commitments/CommitmentsTable'
import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { accountsURL } from 'config/apiURL'
import { investQueryKeys } from 'config/queryKeys'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('CommitmentsTable', () => {
  beforeEach(() => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    render(<CommitmentsTable />)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: accountsURL.commitments.getAllByUserId(user._id),
        name: investQueryKeys.getCommitmentsByUserId(user._id),
        filter: {
          fundStatus: 'Not funded'
        }
      }),
      {}
    )
  })
})
