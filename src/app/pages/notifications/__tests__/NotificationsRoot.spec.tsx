import React from 'react'
import { render } from 'test-utils'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'

describe('NotificationsRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<NotificationsRoot />)
  })
})
