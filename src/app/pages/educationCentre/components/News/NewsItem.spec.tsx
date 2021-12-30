import React from 'react'
import { render } from 'test-utils'
import {
  NewsItem,
  NewsItemProps
} from 'app/pages/educationCentre/components/News/NewsItem'
import Link from '@material-ui/core/Link'

jest.mock('@material-ui/core/Link', () => jest.fn(() => null))

describe('NewsItem', () => {
  const props: NewsItemProps = {
    title: 'Title',
    excerpt: 'Excerpt',
    link: 'Test link',
    imageLink: 'Test image link',
    color: 'primary'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NewsItem {...props} />)
  })

  it.skip('renders with all elements correctly', () => {
    const { getByText } = render(<NewsItem {...props} />)

    expect(getByText('Title')).toBeTruthy()
    expect(getByText('Excerpt')).toBeTruthy()
    expect(Link).toBeCalledWith(
      expect.objectContaining({
        href: props.link
      }),
      {}
    )
  })
})
