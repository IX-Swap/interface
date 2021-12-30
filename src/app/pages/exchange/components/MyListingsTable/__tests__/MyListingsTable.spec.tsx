import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { listingsQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/exchange/components/MyListingsTable/columns'
import { listings } from 'config/apiURL'
import { MyListingsTable } from '../MyListingsTable'
import { SearchFilter } from 'app/components/SearchFilter'
import { Actions } from '../Actions'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/exchange/components/MyListingsTable/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('MyListingsTable', () => {
  const initialFilterValues = {
    search: undefined,
    status: 'Draft,Submitted,Approved,Rejected'
  }

  afterEach(async () => {})

  it.skip('renders without error', async () => {
    renderWithUserStore(<MyListingsTable />)
  })

  it('renders PastOrderFilter without error', () => {
    renderWithUserStore(<MyListingsTable />)

    expect(SearchFilter).toHaveBeenCalled()
  })

  it('renders TableView with correct props if user exists', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    renderWithUserStore(<MyListingsTable />)

    expect(TableView).toHaveBeenCalledWith(
      {
        name: listingsQueryKeys.getListingsList,
        uri: listings.getListByUser(user._id),
        columns,
        filter: initialFilterValues,
        defaultRowsPerPage: 5,
        hasActions: true,
        actions: Actions
      },
      {}
    )
  })
})
