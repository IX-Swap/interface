/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { render, cleanup } from 'test-utils'
import { NotificationsItem } from 'v2/app/pages/notifications/components/NotificationsItem'
import { notification } from '__fixtures__/notification'
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg'
import { getTimeAgo } from 'v2/helpers/dates'

jest.mock('assets/icons/success.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/error.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))

describe('NotificationsItem', () => {
  let props: ListChildComponentProps = {
    data: [notification],
    index: 0,
    style: {}
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsItem {...props} />)
  })

  it('renders message, subject, createdAt correctly', () => {
    const { container } = render(<NotificationsItem {...props} />)

    expect(container).toHaveTextContent(notification.subject)
    expect(container).toHaveTextContent(notification.message)
    expect(container).toHaveTextContent(getTimeAgo(notification.createdAt))
  })

  it('renders container with correct classname', () => {
    const { container } = render(<NotificationsItem {...props} />)

    expect(
      container.querySelector('.MuiListItem-secondaryAction')?.className
    ).toContain('unread')
  })

  it('renders SuccessIcon if type is success', () => {
    render(<NotificationsItem {...props} />)

    expect(SuccessIcon).toHaveBeenCalledTimes(1)
  })

  it('renders ErrorIcon if type is not success', () => {
    props = {
      index: 0,
      style: {},
      data: [{ ...notification, type: 'failure' }]
    }
    render(<NotificationsItem {...props} />)

    expect(ErrorIcon).toHaveBeenCalledTimes(1)
  })
})
