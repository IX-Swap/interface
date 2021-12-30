import React from 'react'
import { render } from 'test-utils'
import {
  LayoutWithSidebar,
  LayoutWithSidebarProps
} from 'app/components/LayoutWithSidebar'

describe('LayoutWithSidebar', () => {
  const props: LayoutWithSidebarProps = {
    sidebar: jest.fn(() => null),
    sidebarToggle: jest.fn(() => null),
    content: jest.fn(() => null)
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<LayoutWithSidebar {...props} />)
  })

  it('renders sidebar and content', () => {
    render(<LayoutWithSidebar {...props} />)

    expect(props.sidebar).toHaveBeenCalledTimes(1)
    expect(props.content).toHaveBeenCalledTimes(1)
  })
})
