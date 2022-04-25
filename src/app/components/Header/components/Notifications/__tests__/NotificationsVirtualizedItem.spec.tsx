import { NotificationsVirtualizedItem } from 'app/components/Header/components/Notifications/NotificationsVirtualizedItem'
import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { render } from 'test-utils'
import { notification } from '__fixtures__/notification'

jest.mock('helpers/dates', () => ({
  getTimeAgo: jest.fn(() => 'Now')
}))

describe('NotificationsVirtualizedItem', () => {
  const props: ListChildComponentProps = {
    data: [notification],
    index: 0,
    style: {}
  }

  afterAll(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<NotificationsVirtualizedItem {...props} />)
    expect(container).toMatchSnapshot()
  })
})
