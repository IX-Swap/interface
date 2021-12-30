import React from 'react'
import { render } from 'test-utils'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { QueryStatus } from 'react-query'

describe('queryStatusRenderer', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<>{queryStatusRenderer(QueryStatus.Loading)}</>)
  })

  it('renders loading if loading', () => {
    const { container } = render(
      <>{queryStatusRenderer(QueryStatus.Loading)}</>
    )

    expect(container).toHaveTextContent('loading...')
  })

  it('renders error if error', () => {
    const { container } = render(<>{queryStatusRenderer(QueryStatus.Error)}</>)

    expect(container).toHaveTextContent('error...')
  })
})
