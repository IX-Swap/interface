import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  LayoutWithSidebar,
  LayoutWithSidebarProps
} from 'v2/app/components/LayoutWithSidebar'

describe('LayoutWithSidebar', () => {
  const props: LayoutWithSidebarProps = {
    sidebar: jest.fn(() => null),
    content: jest.fn(() => null)
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<LayoutWithSidebar {...props} />)
  })

  it('renders sidebar and content', () => {
    render(<LayoutWithSidebar {...props} />)

    expect(props.sidebar).toHaveBeenCalledTimes(1)
    expect(props.content).toHaveBeenCalledTimes(1)
  })
})
