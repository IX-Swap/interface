import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { listingsQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/issuance/components/MyListingsTable/columns'
import { listings } from 'config/apiURL'
import { MyListingsTable } from 'app/pages/issuance/components/MyListingsTable/MyListingsTable'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { Actions } from 'app/pages/issuance/components/MyListingsTable/Actions'

jest.mock('ui/UIKit/TablesKit/components/TableView/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('app/components/TextInputSearchFilter', () => ({
  TextInputSearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/MyListingsTable/Actions', () => ({
  Actions: jest.fn(() => null)
}))

describe('MyListingsTable', () => {
  const initialFilterValues = {
    search: undefined,
    status: 'Draft,Submitted,Approved,Rejected'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders PastOrderFilter without error', () => {
    renderWithUserStore(<MyListingsTable />)

    expect(TextInputSearchFilter).toHaveBeenCalled()
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
        actions: Actions,
        actionHeader: 'Actions'
      },
      {}
    )
  })
})
