import React from 'react'
import { render, cleanup } from 'test-utils'
import { UnassignedAccountTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountTable'
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
    render(<UnassignedAccountTable />)
  })

  it('renders TableView with correct props', () => {
    render(<UnassignedAccountTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        hasActions: true,
        columns
      }),
      {}
    )
  })
})
