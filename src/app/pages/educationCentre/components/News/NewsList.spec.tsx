import React from 'react'
import { QueryStatus } from 'react-query'
import { cleanup, render } from 'test-utils'
import * as useTableWithPaginationHook from 'components/TableWithPagination/hooks/useTableWithPagination'
import {
  NewsList,
  NewsListProps
} from 'app/pages/educationCentre/components/News/NewsList'
import { NewsItem } from 'app/pages/educationCentre/components/News/NewsItem'
import TablePagination from '@material-ui/core/TablePagination'
import { news } from '__fixtures__/news'

const useTableWithPaginationMockReturnValue: useTableWithPaginationHook.UseTableWithPaginationReturnType<any> =
  {
    total: 4,
    items: news,
    setRowsPerPage: jest.fn(),
    setPage: jest.fn(),
    status: QueryStatus.Idle,
    fetchMore: jest.fn(),
    page: 0,
    rowsPerPage: 4
  }

jest.mock('app/pages/educationCentre/components/News/NewsItem', () => ({
  NewsItem: jest.fn(() => null)
}))

jest.mock('@material-ui/core/TablePagination', () => jest.fn(() => null))

describe('NewsList', () => {
  const props: NewsListProps<any> = {
    filter: { search: '' },
    name: 'test',
    uri: 'test/uri'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<NewsList {...props} />)
  })

  it('renders with all news with correct props', () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<NewsList {...props} />)
    expect(NewsItem).toBeCalledTimes(4)
    news.forEach((item, index) => {
      expect(NewsItem).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          title: item.title,
          excerpt: item.excerpt,
          link: item.link,
          imageLink: item.imageLink,
          color: index === 1 || index === 2 ? 'secondary' : 'primary'
        }),
        {}
      )
    })
  })

  it('renders with pagination with correct props', () => {
    jest
      .spyOn(useTableWithPaginationHook, 'useTableWithPagination')
      .mockReturnValueOnce(useTableWithPaginationMockReturnValue)

    render(<NewsList {...props} />)
    expect(TablePagination).toBeCalledWith(
      expect.objectContaining({
        count: -1,
        page: 0,
        component: 'div',
        rowsPerPageOptions: [],
        rowsPerPage: 4,
        nextIconButtonProps: {
          disabled: false
        }
      }),
      {}
    )
  })
})
