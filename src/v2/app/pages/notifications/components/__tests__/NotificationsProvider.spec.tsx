/**  * @jest-environment jsdom-sixteen  */
import React, { ReactNode } from 'react'
import { render, cleanup } from 'test-utils'
import { NotificationsProvider } from 'v2/app/pages/notifications/components/NotificationsProvider'

describe('NotificationsProvider', () => {
  const children: ReactNode = <div data-testid='children' />

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsProvider>{children}</NotificationsProvider>)
  })
})
