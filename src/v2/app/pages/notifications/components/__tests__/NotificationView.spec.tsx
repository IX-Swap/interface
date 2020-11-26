import React from 'react'
import { render, cleanup } from 'test-utils'
import { notification } from '__fixtures__/notification'
import { getTimeAgo } from 'v2/helpers/dates'
import { NotificationView, NotificationViewProps } from '../NotificationView'

describe('NotificationView', () => {
  const props: NotificationViewProps = {
    data: notification,
    action: <div />
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationView {...props} />)
  })

  it('renders message, subject, createdAt correctly', () => {
    const { container } = render(<NotificationView {...props} />)

    expect(container).toHaveTextContent(notification.subject)
    expect(container).toHaveTextContent(notification.message)
    expect(container).toHaveTextContent(getTimeAgo(notification.createdAt))
  })

  it('renders container with correct classname', () => {
    const { getByTestId } = render(<NotificationView {...props} />)

    expect(getByTestId('notification-inner').className).toContain('unread')
  })
})
