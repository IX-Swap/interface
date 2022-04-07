import React from 'react'
import { render } from 'test-utils'
import { Header } from 'app/components/Header/Header'
import { UserDropdown } from 'app/components/Header/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/components/Header/components/Notifications/NotificationsDropdown/NotificationsDropdown'

jest.mock('app/components/Header/components/UserDropdown/UserDropdown', () => ({
  UserDropdown: jest.fn(() => null)
}))
jest.mock(
  'app/components/Header/components/Notifications/NotificationsDropdown',
  () => ({
    NotificationsDropdown: jest.fn(() => null)
  })
)

describe('Header', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders UserDropdown with correct props', () => {
    render(<Header />)

    expect(UserDropdown).toHaveBeenCalledTimes(1)
  })

  it('renders NotificationsDropdown with correct props', () => {
    render(<Header />)

    expect(NotificationsDropdown).toHaveBeenCalledTimes(1)
  })
})
