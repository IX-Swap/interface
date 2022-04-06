import React from 'react'
import { render } from 'test-utils'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { UserDropdown } from 'app/components/Header/components/UserDropdown/UserDropdown'
import { UserDropdownTrigger } from 'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent'

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
