import React from 'react'
import { render, cleanup } from 'test-utils'
import { Dropdown, DropdownProps } from 'v2/app/components/Dropdown/Dropdown'

describe('Dropdown', () => {
  const props: DropdownProps = {
    content: () => <div data-testid='content' />,
    trigger: () => <div data-testid='trigger' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Dropdown {...props} />)
  })
})
