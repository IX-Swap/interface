/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdown } from 'v2/app/components/UserDropdown/UserDropdown'
import { Dropdown } from 'v2/app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'v2/app/components/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'v2/app/components/UserDropdown/UserDropdownContent'

jest.mock('v2/app/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock('v2/app/components/UserDropdown/UserDropdownTrigger', () => ({
  UserDropdownTrigger: jest.fn(() => null)
}))
jest.mock('v2/app/components/UserDropdown/UserDropdownContent', () => ({
  UserDropdownContent: jest.fn(() => null)
}))

describe('UserDropdown', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserDropdown />)
  })

  it('renders Dropdown with correct props', () => {
    render(<UserDropdown />)

    expect(Dropdown).toHaveBeenCalledTimes(1)
    expect(Dropdown).toHaveBeenCalledWith(
      {
        trigger: UserDropdownTrigger,
        content: UserDropdownContent
      },
      {}
    )
  })
})
