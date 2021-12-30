import React from 'react'
import { render } from 'test-utils'
import { UnassignedAccountsTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountsTable'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('components/SelectionHelper', () => ({
  useSelectionHelperContext: jest.fn(() => ({
    selectedCount: 0,
    hasSelected: false,
    selected: [],
    selectItem: jest.fn(),
    deselectItem: jest.fn(),
    getIsItemSelected: jest.fn(),
    getIsItemsSelected: jest.fn(),
    getIsIndeterminate: jest.fn(),
    toggle: jest.fn(),
    toggleAll: jest.fn(),
    resetSelection: jest.fn()
  }))
}))

describe('UnassignedAccountTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<UnassignedAccountsTable />)
  })

  it('renders TableView with correct props', () => {
    render(<UnassignedAccountsTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        hasActions: true,
        columns
      }),
      {}
    )
  })
})
