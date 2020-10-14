/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DropdownTriggerProps } from 'v2/app/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'v2/app/pages/notifications/components/NotificationsDropdownTrigger'
import * as useNotificationsHook from 'v2/app/pages/notifications/hooks/useNotifications'

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

  it('displays ureadCount correctly if count greater than 99', () => {
    jest
      .spyOn(useNotificationsHook, 'useNotifications')
      .mockReturnValue({ unreadCount: 123 } as any)
    const { container } = render(<NotificationsDropdownTrigger {...props} />)

    expect(container).toHaveTextContent('99+')
  })

  it('displays ureadCount correctly if count less than 99', () => {
    jest
      .spyOn(useNotificationsHook, 'useNotifications')
      .mockReturnValue({ unreadCount: 45 } as any)
    const { container } = render(<NotificationsDropdownTrigger {...props} />)

    expect(container).toHaveTextContent('45')
  })
})
