/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdownContent } from 'v2/app/components/UserDropdown/UserDropdownContent'
import { DropdownContentProps } from 'v2/app/components/Dropdown/Dropdown'

describe('UserDropdownContent', () => {
  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserDropdownContent {...props} />)
  })
})
