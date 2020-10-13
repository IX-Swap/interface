/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DropdownTriggerProps } from 'v2/app/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'v2/app/pages/notifications/components/NotificationsDropdownTrigger'

describe('NotificationsDropdownTrigger', () => {
  const props: DropdownTriggerProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsDropdownTrigger {...props} />)
  })
})
