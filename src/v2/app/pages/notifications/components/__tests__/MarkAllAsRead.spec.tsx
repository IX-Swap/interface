/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { MarkAllAsRead } from 'v2/app/pages/notifications/components/MarkAllAsRead'
import * as notificationsHook from 'v2/app/pages/notifications/hooks/useNotifications'
import * as useMarkAllAsReadHook from 'v2/app/pages/notifications/hooks/useMarkAllAsRead'
import { generateMutationResult } from '__fixtures__/useQuery'
import { fireEvent, waitFor } from '@testing-library/react'

describe('MarkAllAsRead', () => {
  const mutate = jest.fn()
  beforeEach(() => {
    jest
      .spyOn(useMarkAllAsReadHook, 'useMarkAllAsRead')
      .mockReturnValue([mutate, generateMutationResult({})])
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ unreadCount: 1 } as any)
    render(<MarkAllAsRead />)
  })

  it('will call mutation function when button is clicked', async () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ unreadCount: 1 } as any)
    const { getByText } = render(<MarkAllAsRead />)

    const button = getByText(/Mark All As Read/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
      expect(mutate).toHaveBeenCalledWith()
    })
  })

  it('will disable Button if unreadCount is 0', () => {
    jest
      .spyOn(notificationsHook, 'useNotifications')
      .mockReturnValue({ unreadCount: 0 } as any)
    const { getByText } = render(<MarkAllAsRead />)

    const button = getByText(/Mark All As Read/i)
    expect(button.parentElement).toBeDisabled()
  })
})
