import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdown } from 'app/components/UserDropdown/UserDropdown'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/UserDropdown/UserDropdownContent'

jest.mock('app/__tests__/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock('app/__tests__/UserDropdown/UserDropdownTrigger', () => ({
  UserDropdownTrigger: jest.fn(() => null)
}))
jest.mock('app/__tests__/UserDropdown/UserDropdownContent', () => ({
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
