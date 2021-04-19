import React from 'react'
import { render, cleanup } from 'test-utils'
import { News } from 'app/pages/home/components/News/News'
import { NewsList } from 'app/pages/home/components/News/NewsList'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'

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

  it('renders with NewsList with correct props', () => {
    render(<News />)
    expect(NewsList).toBeCalledWith(
      expect.objectContaining({
        filter: {
          search: undefined
        },
        uri: homeURL.getNewsList,
        name: homeQueryKeys.getNewsList
      }),
      {}
    )
  })
})
