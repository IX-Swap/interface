/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  NotificationsList,
  NotificationsListProps
} from 'v2/app/pages/notifications/components/NotificationsList'
import { NoData } from 'v2/app/components/NoData/NoData'
import { LoadingIndicator } from 'v2/app/components/LoadingIndicator/LoadingIndicator'
import * as notificationsHook from 'v2/app/pages/notifications/hooks/useNotifications'
import { notification } from '__fixtures__/notification'

jest.mock('v2/app/components/NoData/NoData', () => ({
  NoData: jest.fn(() => null)
}))
jest.mock('v2/app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('NotificationsList', () => {
  const props: NotificationsListProps = {}
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [notification], isLoading: false } as any)
    render(<NotificationsList {...props} />)
  })

  it('renders NoData if data is empty', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [], isLoading: false } as any)
    render(<NotificationsList {...props} />)

    expect(NoData).toHaveBeenCalledTimes(1)
    expect(NoData).toHaveBeenCalledWith({ style: expect.any(Object) }, {})
  })

  it('renders LoadingIndicator if isLoading is true', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [], isLoading: true } as any)
    render(<NotificationsList {...props} />)

    expect(LoadingIndicator).toHaveBeenCalledTimes(1)
    expect(LoadingIndicator).toHaveBeenCalledWith({}, {})
  })
})
