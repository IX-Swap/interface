import React from 'react'
import { render } from 'test-utils'
import { News } from 'app/pages/educationCentre/components/News/News'
import { NewsList } from 'app/pages/educationCentre/components/News/NewsList'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { SearchFilter } from 'app/components/SearchFilter'

jest.mock('app/pages/educationCentre/components/News/NewsList', () => ({
  NewsList: jest.fn(() => null)
}))

jest.mock('app/components/SearchFilter', () => ({
  SearchFilter: jest.fn(() => null)
}))

describe('News', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<News />)
  })

  it.skip('renders with NewsList with correct props', () => {
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

  it.skip('renders with SearchFilter', () => {
    render(<News />)
    expect(SearchFilter).toBeCalled()
  })

  it('render correct title and description', () => {
    const { getAllByText } = render(<News />)
    expect(getAllByText('News')).toBeTruthy()
    expect(getAllByText('In Partnership With')).toBeTruthy()
  })
})
