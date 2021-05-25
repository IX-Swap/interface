import React from 'react'
import { render, cleanup } from 'test-utils'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'
import { ViewAllNotifications } from 'app/pages/notifications/components/ViewAllNotifications'

jest.mock('app/pages/notifications/__tests__/ViewAllNotifications', () => ({
  ViewAllNotifications: jest.fn(() => null)
}))

describe('NotificationsDropdownContent', () => {
  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsDropdownContent {...props} />)
  })

  it('renders ViewAllNotifications with correct props', () => {
    render(<NotificationsDropdownContent {...props} />)

    expect(ViewAllNotifications).toHaveBeenCalledTimes(1)
    expect(ViewAllNotifications).toHaveBeenCalledWith(
      {
        onClick: props.injectedProps.close
      },
      {}
    )
  })
})
