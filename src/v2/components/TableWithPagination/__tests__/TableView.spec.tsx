/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import {
  TableView,
  TableViewProps
} from 'v2/components/TableWithPagination/TableView'
import * as useTableWithPaginationHook from 'v2/components/TableWithPagination/hooks/useTableWithPagination'
import { QueryStatus } from 'react-query'

const useTableWithPaginationMockReturnValue: useTableWithPaginationHook.UseTableWithPaginationReturnType<any> = {
  total: 0,
  items: [],
  setRowsPerPage: jest.fn(),
  setPage: jest.fn(),
  status: QueryStatus.Idle,
  fetchMore: jest.fn(),
  page: 0,
  rowsPerPage: 5
}

describe('TableView', () => {
  const props: TableViewProps<any> = {
    actions: undefined,
    bordered: false,
    children: undefined,
    columns: [],
    filter: undefined,
    hasActions: false,
    name: 'test',
    uri: 'test/uri'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<TableView {...props} />)
  })

  it('renders table', async () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    const { getByTestId } = render(<TableView {...props} />)
    const table = getByTestId('table')

    expect(table).toBeTruthy()
  })
})
