import React from 'react'
import { render } from 'test-utils'
import {
  SidebarLinkContainer,
  SidebarLinkProps
} from 'app/components/SidebarContainer/components/SidebarLinkContainer'

describe('SidebarLink', () => {
  const props: SidebarLinkProps = {
    link: '/test-link',
    label: 'Test Label',
    icon: jest.fn(() => null)
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders label correctly', () => {
    const { container } = render(<SidebarLinkContainer {...props} />)

    expect(container).toHaveTextContent(props.label)
  })

  it('renders link correctly', () => {
    const { container } = render(<SidebarLinkContainer {...props} />)

    expect(container.querySelector('a')).toHaveAttribute('href', props.link)
  })

  it('renders icon correctly', () => {
    render(<SidebarLinkContainer {...props} />)

    expect(props.icon).toHaveBeenCalledTimes(1)
  })
})
