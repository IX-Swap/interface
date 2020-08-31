/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, render } from 'test-utils'
import {
  TableView,
  TableViewProps
} from 'v2/components/TableWithPagination/TableView'
import {
  useTableWithPagination,
  UseTableWithPaginationReturnType
} from 'v2/components/TableWithPagination/hooks/useTableWithPagination'
import { QueryStatus } from 'react-query'

jest.mock('v2/components/TableWithPagination/hooks/useTableWithPagination')

const useTableWithPaginationMock = useTableWithPagination as jest.Mock<
  Partial<ReturnType<typeof useTableWithPagination>>
>

const useTableWithPaginationMockReturnValue: UseTableWithPaginationReturnType<any> = {
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
    children: null,
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
    useTableWithPaginationMock.mockReturnValueOnce(
      useTableWithPaginationMockReturnValue
    )

    render(<TableView {...props} />)
  })

  it('render', async () => {
    useTableWithPaginationMock.mockReturnValueOnce(
      useTableWithPaginationMockReturnValue
    )

    const { getByTestId } = render(<TableView {...props} />)
    const table = getByTestId('table')

    expect(table).toBeTruthy()
  })
})
