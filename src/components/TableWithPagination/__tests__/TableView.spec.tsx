import React from 'react'
import { cleanup, render } from 'test-utils'
import {
  TableView,
  TableViewProps
} from 'components/TableWithPagination/TableView'
import * as useTableWithPaginationHook from 'components/TableWithPagination/hooks/useTableWithPagination'
import { QueryStatus } from 'react-query'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { fakeVirtualAccount } from '__fixtures__/unassignedVirtualAccounts'
import { TablePagination } from '@material-ui/core'

jest.mock('components/SelectionHelper', () => ({
  useSelectionHelperContext: jest.fn(() => {})
}))

jest.mock('@material-ui/core/TablePagination', () => jest.fn(() => null))

const useTableWithPaginationMockReturnValue: useTableWithPaginationHook.UseTableWithPaginationReturnType<any> =
  {
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

  const extraProps: TableViewProps<any> = {
    ...props,
    selectionHelper: useSelectionHelperContext(),
    fakeItems: [fakeVirtualAccount]
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

  it('renders with selectionHelper prop without error', () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<TableView {...extraProps} />)
  })

  it('renders TablePagination when total is 0', () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<TableView {...extraProps} />)

    expect(TablePagination).toHaveBeenCalledTimes(0)
  })

  it('renders TablePagination with correct props when total is more than 0', () => {
    const useExtendedTableWithPaginationMockReturnValue = {
      ...useTableWithPaginationMockReturnValue,
      total: 1
    }
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useExtendedTableWithPaginationMockReturnValue)

    render(<TableView {...extraProps} />)

    expect(TablePagination).toHaveBeenCalledTimes(1)
    expect(TablePagination).toHaveBeenCalledWith(
      expect.objectContaining({
        page: useExtendedTableWithPaginationMockReturnValue.page,
        count: useExtendedTableWithPaginationMockReturnValue.total,
        rowsPerPage: useExtendedTableWithPaginationMockReturnValue.rowsPerPage,
        colSpan: 0
      }),
      {}
    )
  })
})
