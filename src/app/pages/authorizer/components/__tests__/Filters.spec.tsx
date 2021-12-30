import React from 'react'
import { render } from 'test-utils'
import { Filters } from 'app/pages/authorizer/components/Filters'

jest.mock('app/pages/authorizer/components/StatusFilter', () => ({
  StatusFilter: jest.fn(() => <div data-testid='status-filter' />)
}))
jest.mock('app/pages/authorizer/components/SearchAndDateFilter', () => ({
  SearchAndDateFilter: jest.fn(() => <div data-testid='search-date-filter' />)
}))

describe('Filters', () => {
  afterEach(async () => {})

  it('renders title, StatusFilter and SearchAndDateFilter', async () => {
    const { getByText, getByTestId } = render(<Filters />)
    const title = getByText(/filters/i)
    const statusFilter = getByTestId('status-filter')
    const searchAndDateFilter = getByTestId('search-date-filter')

    expect(title).toBeTruthy()
    expect(statusFilter).toBeTruthy()
    expect(searchAndDateFilter).toBeTruthy()
  })
})
