import React from 'react'
import { render, cleanup } from 'test-utils'
import { UnassignedAccountsTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountsTable'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('components/SelectionHelper', () => ({
  useSelectionHelperContext: jest.fn(() => null)
}))

describe('UnassignedAccountTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
