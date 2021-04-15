import React from 'react'
import { render, cleanup } from 'test-utils'
import { News } from 'app/pages/home/components/News/News'
import { NewsList } from 'app/pages/home/components/News/NewsList'

jest.mock('app/pages/home/components/News/NewsList', () => ({
  NewsList: jest.fn(() => null)
}))

describe('News', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<News />)
  })

  it('renders with NewsList', () => {
    render(<News />)
    expect(NewsList).toBeCalled()
  })
})
