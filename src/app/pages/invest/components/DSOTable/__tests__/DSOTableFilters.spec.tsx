import React from 'react'
import { render, fireEvent, waitFor, cleanup } from 'test-utils'
import { TableColumn } from 'types/util'
import { DigitalSecurityOffering, DSOTableColumn } from 'types/dso'
import { DSOTableFilters } from 'app/pages/invest/components/DSOTable/DSOTableFilters'
import { history } from 'config/history'
import {
  useDSOTableColumns,
  getDefaultColumnsObject
} from 'app/pages/invest/hooks/useDSOTableColumns'

jest.mock('app/pages/invest/hooks/useDSOTableColumns', () => ({
  useDSOTableColumns: jest.fn(),
  getDefaultColumnsObject: jest.fn()
}))

describe('DSOTableFilters', () => {
  const mockColumns: Array<TableColumn<
    DigitalSecurityOffering,
    DSOTableColumn
  >> = [
    {
      key: 'favorite',
      label: 'favorite'
    },
    {
      key: 'corporate',
      label: 'corporate'
    },
    {
      key: 'insight',
      label: 'insight'
    },
    {
      key: 'pricePerUnit',
      label: 'pricePerUnit'
    },
    {
      key: 'totalFundraisingAmount',
      label: 'totalFundraisingAmount'
    },
    {
      key: 'minimumInvestment',
      label: 'minimumInvestment'
    },
    {
      key: 'distributionFrequency',
      label: 'distributionFrequency'
    }
  ]
  const mockDefaultColumns: Record<DSOTableColumn, boolean> = {
    favorite: true,
    corporate: true,
    insight: true,
    pricePerUnit: true,
    totalFundraisingAmount: true,
    minimumInvestment: true,
    distributionFrequency: true
  }

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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any errors', () => {
    render(<DSOTableFilters />)
  })

  it('renders SearchFilter correctly', async () => {
    const { getByRole, getByPlaceholderText } = render(<DSOTableFilters />)
    const searchBar = getByRole('textbox')
    expect(searchBar).toBeInTheDocument()
    expect(getByPlaceholderText('Search Offers')).toBeInTheDocument()

    fireEvent.change(searchBar, { target: { value: 'beep' } })
    await waitFor(() => {
      expect(history.location.search).toBe('?search=beep')
    })
  })

  it('renders ColumnEditor correctly', async () => {
    const { getByRole, getByText, queryByText, getAllByRole } = render(
      <DSOTableFilters />
    )
    const showColumnsButton = getByRole('button')
    expect(showColumnsButton).toBeInTheDocument()
    expect(queryByText('Add more columns')).not.toBeInTheDocument()
    expect(getAllByRole('button')).toHaveLength(1)

    fireEvent.click(showColumnsButton)
    await waitFor(() => {
      expect(getByText('Add more columns')).toBeInTheDocument()
      expect(getAllByRole('button')).toHaveLength(8)
    })

    fireEvent.click(showColumnsButton)
    await waitFor(() => {
      expect(queryByText('Add more columns')).not.toBeInTheDocument()
      expect(getAllByRole('button')).toHaveLength(1)
    })
  })
})
