import React from 'react'
import { render } from 'test-utils'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import { managedUser } from '__fixtures__/user'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { SearchFilter } from 'app/components/SearchFilter'
import { TableView } from 'components/TableWithPagination/TableView'
import { authURL } from 'config/apiURL'
import { authQueryKeys } from 'config/queryKeys'
import { AdminRoute } from 'app/pages/admin/router/config'
import { generatePath, Route } from 'react-router-dom'
import { history } from 'config/history'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/columns', () => ({
  columns: []
}))

describe('AccountLoginHitory', () => {
  beforeEach(() => {
    history.push(generatePath(AdminRoute.view, { userId: managedUser._id }))
    const getFilterValueFn = jest.fn(() => 'search-key')

    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => ({ getFilterValue: getFilterValueFn } as any))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AccountLoginHistory />)
  })

  it('renders components correctly', () => {
    render(
      <Route path={AdminRoute.view}>
        <AccountLoginHistory />
      </Route>
    )

    expect(SearchFilter).toHaveBeenCalled()
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: authURL.getLoginHistory(managedUser._id),
        name: authQueryKeys.getLoginHistory(managedUser._id),
        columns: [],
        filter: { search: 'search-key' }
      }),
      {}
    )
  })
})
