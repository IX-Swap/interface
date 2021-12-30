import React from 'react'
import { render } from 'test-utils'
import { Notifications } from 'app/pages/notifications/components/Notifications'

describe('Notifications', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Notifications />)
  })
})
