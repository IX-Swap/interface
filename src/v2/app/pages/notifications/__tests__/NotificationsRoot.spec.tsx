import React from 'react'
import { render, cleanup } from 'test-utils'
import { NotificationsRoot } from 'v2/app/pages/notifications/NotificationsRoot'

describe('NotificationsRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsRoot />)
  })
})
