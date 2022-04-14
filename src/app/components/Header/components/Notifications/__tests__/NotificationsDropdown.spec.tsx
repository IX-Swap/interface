import React from 'react'
import { render } from 'test-utils'
import { Dropdown } from 'app/components/Header/components/Dropdown/Dropdown'
import { NotificationsDropdown } from 'app/components/Header/components/Notifications/NotificationsDropdown/NotificationsDropdown'
import { NotificationsDropdownContent } from 'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent'
import { NotificationsDropdownTrigger } from 'app/components/Header/components/Notifications/NotificationsDropdownTrigger'

jest.mock('app/components/Header/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock(
  'app/components/Header/components/Notifications/NotificationsDropdownTrigger/NotificationsDropdownTrigger',
  () => ({ NotificationsDropdownTrigger: jest.fn(() => null) })
)
jest.mock(
  'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent',
  () => ({ NotificationsDropdownContent: jest.fn(() => null) })
)

describe('NotificationsDropdown', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Dropdown with correct props', () => {
    render(<NotificationsDropdown />)

    expect(Dropdown).toHaveBeenCalledTimes(1)
    expect(Dropdown).toHaveBeenCalledWith(
      {
        trigger: NotificationsDropdownTrigger,
        content: NotificationsDropdownContent
      },
      {}
    )
  })
})
