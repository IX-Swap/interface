import React from 'react'
import { render } from 'test-utils'
import { Header } from 'app/components/Header/Header'
import { UserDropdown } from 'app/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'app/pages/notifications/components/NotificationsDropdown'

jest.mock('app/components/UserDropdown/UserDropdown', () => ({
  UserDropdown: jest.fn(() => null)
}))
jest.mock('app/pages/notifications/components/NotificationsDropdown', () => ({
  NotificationsDropdown: jest.fn(() => null)
}))

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
