import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

jest.mock('components/SearchQueryFilter/SearchQueryFilter', () => ({
  SearchQueryFilter: jest.fn(() => null)
}))

describe('DateFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DateFilter name='fromDate' label='From' />)
  })

  it('renders without errors', () => {
    render(<DateFilter name='fromDate' label='From' />)
    expect(SearchQueryFilter).toHaveBeenCalledTimes(1)
    expect(SearchQueryFilter).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'fromDate' }),
      {}
    )
  })
})
