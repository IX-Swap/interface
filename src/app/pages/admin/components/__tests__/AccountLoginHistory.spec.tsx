import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import * as useAdminRouter from 'app/pages/admin/router'
import { managedUser } from '__fixtures__/user'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { SearchFilter } from 'app/components/SearchFilter'
import { TableView } from 'components/TableWithPagination/TableView'
import { authURL } from 'config/apiURL'
import { authQueryKeys } from 'config/queryKeys'

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
    jest
      .spyOn(useAdminRouter, 'useAdminRouter')
      .mockImplementation(
        () => ({ params: { userId: managedUser._id } } as any)
      )

    const getFilterValueFn = jest.fn(() => 'search-key')

    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => ({ getFilterValue: getFilterValueFn } as any))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AccountLoginHistory />)
  })

  it('renders components correctly', () => {
    render(<AccountLoginHistory />)

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
