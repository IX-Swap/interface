/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { NotificationsDropdown } from 'v2/app/pages/notifications/components/NotificationsDropdown'

describe('NotificationsDropdown', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsDropdown />)
  })
})
