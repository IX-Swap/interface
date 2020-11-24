import React from 'react'
import { render, cleanup } from 'test-utils'
import { Notifications } from 'v2/app/pages/notifications/components/Notifications'

describe('Notifications', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Notifications />)
  })
})
