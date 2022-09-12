import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { listingsQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/issuance/components/SecondaryListingsTable/columns'
import { listings } from 'config/apiURL'
import { SecondaryListingsTable } from 'app/pages/issuance/components/SecondaryListingsTable/SecondaryListingsTable'
import { Actions } from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions'

jest.mock('ui/UIKit/TablesKit/components/TableView/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('app/components/TextInputSearchFilter', () => ({
  TextInputSearchFilter: jest.fn(() => null)
}))

jest.mock(
  'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions',
  () => ({
    Actions: jest.fn(() => null)
  })
)

describe('SecondaryListingsTable', () => {
  const initialFilterValues = {
    searchKeyword: undefined,
    sortField: undefined,
    sortOrder: -1,
    status: 'Draft,Submitted,Approved,Rejected'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props if user exists', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    renderWithUserStore(<SecondaryListingsTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: listingsQueryKeys.getCombinedList,
        uri: listings.getCombinedList(user._id),
        columns,
        filter: initialFilterValues,
        defaultRowsPerPage: 5,
        actions: Actions,
        actionHeader: 'Actions'
      }),
      {}
    )
  })
})
