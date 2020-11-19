import React from 'react'
import { render, cleanup } from 'test-utils'
import { Header } from 'v2/app/components/Header/Header'
import { UserDropdown } from 'v2/app/components/UserDropdown/UserDropdown'
import { NotificationsDropdown } from 'v2/app/pages/notifications/components/NotificationsDropdown'

jest.mock('v2/app/components/UserDropdown/UserDropdown', () => ({
  UserDropdown: jest.fn(() => null)
}))
jest.mock(
  'v2/app/pages/notifications/components/NotificationsDropdown',
  () => ({ NotificationsDropdown: jest.fn(() => null) })
)

describe('Header', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Header />)
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
