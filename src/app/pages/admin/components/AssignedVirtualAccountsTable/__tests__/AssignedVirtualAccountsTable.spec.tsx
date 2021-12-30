import { AssignedVirtualAccountsTable } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import React from 'react'
import { render } from 'test-utils'

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

describe('AssignedVirtualAccountsTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AssignedVirtualAccountsTable />)
  })
})
