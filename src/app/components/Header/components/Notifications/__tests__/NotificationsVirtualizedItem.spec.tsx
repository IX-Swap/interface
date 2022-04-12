import React from 'react'
import { render } from 'test-utils'
import { notification } from '__fixtures__/notification'
import { ListChildComponentProps } from 'react-window'
import { NotificationsVirtualizedItem } from 'app/components/Header/components/Notifications/NotificationsVirtualizedItem'

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
