import React from 'react'
import { render, cleanup } from 'test-utils'
import { News } from 'app/pages/home/components/News/News'
import { SearchFilter } from 'app/components/SearchFilter'

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

describe('News', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<News />)
  })

  it('renders with SearchFilter', () => {
    render(<News />)
    expect(SearchFilter).toBeCalled()
  })

  it('render correct title and description', () => {
    const { getAllByText } = render(<News />)
    expect(getAllByText('News')).toBeTruthy()
    expect(getAllByText('In Partnership With')).toBeTruthy()
  })
})
