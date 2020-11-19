import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  SidebarLink,
  SidebarLinkProps
} from 'v2/app/components/Sidebar/components/SidebarLink'

describe('SidebarLink', () => {
  const props: SidebarLinkProps = {
    link: '/test-link',
    label: 'Test Label',
    icon: jest.fn(() => null)
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SidebarLink {...props} />)
  })

  it('renders label correctly', () => {
    const { container } = render(<SidebarLink {...props} />)

    expect(container).toHaveTextContent(props.label)
  })

  it('renders link correctly', () => {
    const { container } = render(<SidebarLink {...props} />)

    expect(container.querySelector('a')).toHaveAttribute('href', props.link)
  })

  it('renders icon correctly', () => {
    render(<SidebarLink {...props} />)

    expect(props.icon).toHaveBeenCalledTimes(1)
  })
})
