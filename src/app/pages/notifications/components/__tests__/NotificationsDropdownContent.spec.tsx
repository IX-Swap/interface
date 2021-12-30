import React from 'react'
import { render } from 'test-utils'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { NotificationsDropdownContent } from 'app/pages/notifications/components/NotificationsDropdownContent'
import { ViewAllNotifications } from 'app/pages/notifications/components/ViewAllNotifications'

jest.mock('app/pages/notifications/components/ViewAllNotifications', () => ({
  ViewAllNotifications: jest.fn(() => null)
}))

describe('NotificationsDropdownContent', () => {
  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
