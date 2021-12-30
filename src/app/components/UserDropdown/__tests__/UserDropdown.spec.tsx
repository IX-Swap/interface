import React from 'react'
import { render } from 'test-utils'
import { UserDropdown } from 'app/components/UserDropdown/UserDropdown'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/UserDropdown/UserDropdownContent'

jest.mock('app/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock('app/components/UserDropdown/UserDropdownTrigger', () => ({
  UserDropdownTrigger: jest.fn(() => null)
}))
jest.mock('app/components/UserDropdown/UserDropdownContent', () => ({
  UserDropdownContent: jest.fn(() => null)
}))

describe('UserDropdown', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
