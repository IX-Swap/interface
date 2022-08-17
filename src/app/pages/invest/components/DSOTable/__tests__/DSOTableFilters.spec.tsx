import React from 'react'
import { render, fireEvent, waitFor, renderWithInitialWidth } from 'test-utils'
import { DSOTableFilters } from 'app/pages/invest/components/DSOTable/DSOTableFilters'
import { history } from 'config/history'
import {
  useDSOTableColumns,
  getDefaultColumnsObject
} from 'app/pages/invest/hooks/useDSOTableColumns'
import { mockColumns, mockDefaultColumns } from '__fixtures__/columnFilters'

jest.mock('components/form/CapitalStructureSelect', () => ({
  CapitalStructureSelect: jest.fn(() => null)
}))

jest.mock('app/pages/invest/hooks/useDSOTableColumns', () => ({
  useDSOTableColumns: jest.fn(),
  getDefaultColumnsObject: jest.fn()
}))

describe('DSOTableFilters', () => {
  const mockSelect = jest.fn()
  const mockDeselect = jest.fn()

  beforeEach(() => {
    const useDSOTableColumnsHook = useDSOTableColumns as jest.Mock
    useDSOTableColumnsHook.mockReturnValue({
      columns: mockColumns,
      selectColumn: mockSelect,
      deselectColumn: mockDeselect
    })

    const getDefaultColumnsObjectHook = getDefaultColumnsObject as jest.Mock
    getDefaultColumnsObjectHook.mockReturnValue(mockDefaultColumns)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders ColumnEditor correctly', async () => {
    const { getByText, queryByText, getAllByRole } = renderWithInitialWidth(
      <DSOTableFilters />,
      'lg'
    )
    const showColumnsButton = getAllByRole('button')[0]
    expect(showColumnsButton).toBeInTheDocument()
    expect(queryByText('Add more columns')).not.toBeInTheDocument()
    expect(getAllByRole('button')).toHaveLength(1)

    fireEvent.click(showColumnsButton)

    await waitFor(() => {
      expect(getByText('Add more columns')).toBeInTheDocument()
      expect(getAllByRole('button')).toHaveLength(mockColumns.length + 1)
    })

    fireEvent.click(showColumnsButton)
    await waitFor(() => {
      expect(queryByText('Add more columns')).not.toBeInTheDocument()
      expect(getAllByRole('button')).toHaveLength(2)
    })
  })
})
