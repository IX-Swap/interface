import React from 'react'
import { render } from 'test-utils'
import {
  TopbarLinkContainer,
  TopbarLinkProps
} from 'app/components/TopbarContainer/components/TopbarLinkContainer'

describe('TopbarLink', () => {
  const props: TopbarLinkProps = {
    link: '/test-link',
    label: 'Test Label'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<TopbarLinkContainer {...props} />)
  })

  it('renders label correctly', () => {
    const { container } = render(<TopbarLinkContainer {...props} />)

    expect(container).toHaveTextContent(props.label)
  })

  it('renders link correctly', () => {
    const { container } = render(<TopbarLinkContainer {...props} />)

    expect(container.querySelector('a')).toHaveAttribute('href', props.link)
  })
})
