import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentTableFilter } from 'app/pages/issuance/components/Commitments/CommitmentTableFilters'
import { SearchFilter } from 'app/components/SearchFilter'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/Commitments/FundStatusFilter', () => ({
  FundStatusFilter: jest.fn(() => null)
}))

describe('CommitmentTableFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CommitmentTableFilter />)
  })

  it('renders SearchFilter with correct props', () => {
    render(<CommitmentTableFilter />)
    expect(SearchFilter).toHaveBeenCalledTimes(1)
    expect(SearchFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        fullWidth: true,
        placeholder: 'Search Name'
      }),
      {}
    )
  })

  it('renders FundStatusFilter', () => {
    render(<CommitmentTableFilter />)
    expect(FundStatusFilter).toHaveBeenCalledTimes(1)
  })
})
