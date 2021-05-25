import React from 'react'
import { render, cleanup } from 'test-utils'
import { NotificationsDropdown } from 'app/pages/notifications/components/NotificationsDropdown'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'app/pages/notifications/components/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'

jest.mock('app/__tests__/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock(
  'app/pages/notifications/__tests__/NotificationsDropdownTrigger',
  () => ({ NotificationsDropdownTrigger: jest.fn(() => null) })
)
jest.mock(
  'app/pages/notifications/__tests__/NotificationsDropdownContent',
  () => ({ NotificationsDropdownContent: jest.fn(() => null) })
)

describe('NotificationsDropdown', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsDropdown />)
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
