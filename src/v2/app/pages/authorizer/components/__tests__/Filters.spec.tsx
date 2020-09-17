/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Filters,
  FiltersProps
} from 'v2/app/pages/authorizer/components/Filters'

jest.mock('v2/app/pages/authorizer/components/StatusFilter', () => ({
  StatusFilter: jest.fn(() => <div data-testid='status-filter' />)
}))
jest.mock('v2/app/pages/authorizer/components/SearchAndDateFilter', () => ({
  SearchAndDateFilter: jest.fn(() => <div data-testid='search-date-filter' />)
}))

describe('Filters', () => {
  const props: FiltersProps = {
    onApplyFilter: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
  })

  it('renders title, StatusFilter and SearchAndDateFilter', async () => {
    const { getByText, getByTestId } = render(<Filters {...props} />)
    const title = getByText(/filters/i)
    const statusFilter = getByTestId('status-filter')
    const searchAndDateFilter = getByTestId('search-date-filter')

    expect(title).toBeTruthy()
    expect(statusFilter).toBeTruthy()
    expect(searchAndDateFilter).toBeTruthy()
  })
})
