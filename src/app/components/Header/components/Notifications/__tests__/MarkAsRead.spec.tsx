import React from 'react'
import { render } from 'test-utils'
import { notification } from '__fixtures__/notification'

import {
  MarkAsRead,
  MarkAsReadProps
} from 'app/components/Header/components/Notifications/MarkAsRead/MarkAsRead'

describe('MarkAsRead', () => {
  const props: MarkAsReadProps = {
    data: notification
  }

  afterAll(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<MarkAsRead {...props} />)
    expect(container).toMatchSnapshot()
  })
})
