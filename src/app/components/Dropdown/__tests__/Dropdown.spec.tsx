import React from 'react'
import { render } from 'test-utils'
import { Dropdown, DropdownProps } from 'app/components/Dropdown/Dropdown'

describe('Dropdown', () => {
  const props: DropdownProps = {
    content: () => <div data-testid='content' />,
    trigger: () => <div data-testid='trigger' />
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Dropdown {...props} />)
  })
})
