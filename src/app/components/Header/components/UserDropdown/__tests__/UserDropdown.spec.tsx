import React from 'react'
import { render } from 'test-utils'
import { UserDropdown } from 'app/components/Header/components/UserDropdown/UserDropdown'
import { UserDropdownTrigger } from 'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent'
import { Dropdown } from 'app/components/Header/components/Dropdown/Dropdown'

jest.mock('app/components/Header/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock(
  'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger',
  () => ({
    UserDropdownTrigger: jest.fn(() => null)
  })
)
jest.mock(
  'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent',
  () => ({
    UserDropdownContent: jest.fn(() => null)
  })
)

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
