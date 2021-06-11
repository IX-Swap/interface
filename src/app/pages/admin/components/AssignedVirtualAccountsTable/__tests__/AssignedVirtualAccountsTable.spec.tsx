import { AssignedVirtualAccountsTable } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import * as useResetSelectionOnUnmount from 'app/pages/admin/hooks/useResetSelectionOnUnmount'
import React from 'react'
import { render, cleanup } from 'test-utils'

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
  beforeEach(() => {
    jest
      .spyOn(useResetSelectionOnUnmount, 'useResetSelectionOnUnmount')
      .mockImplementation(() => ({} as any))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AssignedVirtualAccountsTable />)
  })
})
