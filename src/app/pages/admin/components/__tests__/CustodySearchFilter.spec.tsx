import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter'
import { SearchFilter } from 'app/components/SearchFilter'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

describe('CustodySearchFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodySearchFilter />)
  })

  it('renders SearchFilter component with correct props', () => {
    render(<CustodySearchFilter />)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search',
        inputAdornmentPosition: 'start'
      }),
      {}
    )
  })
})
