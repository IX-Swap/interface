import React from 'react'
import { render } from 'test-utils'
import { NotificationsList } from 'app/pages/notifications/components/NotificationsList'
import { NoData } from 'app/components/NoData/NoData'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import * as notificationsHook from 'app/pages/notifications/hooks/useNotifications'
import { notification } from '__fixtures__/notification'

jest.mock('app/components/NoData/NoData', () => ({
  NoData: jest.fn(() => null)
}))
jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('NotificationsList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [notification], isLoading: false } as any)

    render(<NotificationsList />)
  })

  it('renders NoData if data is empty', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [], isLoading: false } as any)

    render(<NotificationsList />)

    expect(NoData).toHaveBeenCalled()
  })

  it('renders LoadingIndicator if isLoading is true', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ data: [], isLoading: true } as any)

    render(<NotificationsList />)

    expect(LoadingIndicator).toHaveBeenCalled()
  })
})
