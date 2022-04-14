import React from 'react'
import { render } from 'test-utils'
import * as Badge from '@mui/material/Badge'
import * as useNotifications from 'app/pages/notifications/hooks/useNotifications'
import { DropdownTriggerProps } from 'app/components/Header/components/Dropdown/Dropdown'
import { NotificationsDropdownTrigger } from 'app/components/Header/components/Notifications/NotificationsDropdownTrigger'

jest.mock('@mui/material/Badge', () => jest.fn(() => null))

describe('NotificationsDropdownTrigger', () => {
  const props: DropdownTriggerProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders badge component with correct props if unreadCount > 0', () => {
    jest.spyOn(useNotifications, 'useNotifications').mockReturnValue({
      unreadCount: 10
    } as any)

    render(<NotificationsDropdownTrigger {...props} />)

    expect(Badge).toHaveBeenCalledTimes(1)
    expect(Badge).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'dot'
      }),
      {}
    )
  })

  it('renders badge component with correct props if unreadCount is 0', () => {
    jest.spyOn(useNotifications, 'useNotifications').mockReturnValue({
      unreadCount: 0
    } as any)

    render(<NotificationsDropdownTrigger {...props} />)

    expect(Badge).toHaveBeenCalledTimes(1)
    expect(Badge).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'standard'
      }),
      {}
    )
  })
})
