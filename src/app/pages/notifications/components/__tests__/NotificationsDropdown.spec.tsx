import React from 'react'
import { render } from 'test-utils'
import { NotificationsDropdown } from 'app/pages/notifications/components/NotificationsDropdown'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'app/pages/notifications/components/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'

jest.mock('app/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock(
  'app/pages/notifications/components/NotificationsDropdownTrigger',
  () => ({ NotificationsDropdownTrigger: jest.fn(() => null) })
)
jest.mock(
  'app/pages/notifications/components/NotificationsDropdownContent',
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
