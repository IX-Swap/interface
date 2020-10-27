/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'
import { QueryStatus } from 'react-query'

describe('queryStatusRenderer', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
