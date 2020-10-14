/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { NotificationsDropdown } from 'v2/app/pages/notifications/components/NotificationsDropdown'
import { Dropdown } from 'v2/app/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'v2/app/pages/notifications/components/NotificationsDropdownTrigger'
import { NotificationsDropdownContent } from 'v2/app/pages/notifications/components/NotificationsDropdownContent'

jest.mock('v2/app/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))
jest.mock(
  'v2/app/pages/notifications/components/NotificationsDropdownTrigger',
  () => ({ NotificationsDropdownTrigger: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/notifications/components/NotificationsDropdownContent',
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
