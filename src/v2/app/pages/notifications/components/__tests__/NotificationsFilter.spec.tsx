/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import { NotificationFilter } from 'v2/types/app'
import * as notificationsFilterHook from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationsFilter } from 'v2/app/pages/notifications/components/NotificationsFilter'

describe('NotificationsFilter', () => {
  const hookReturnValues = {
    filter: [NotificationFilter.Authentication],
    handleClick: jest.fn()
  }
  beforeEach(() => {
    jest
      .spyOn(notificationsFilterHook, 'useNotificationsFilter')
      .mockReturnValue(hookReturnValues)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NotificationsFilter />)
  })

  it('checks filter checkbox based on filter value from hook', async () => {
    const { getByLabelText } = render(<NotificationsFilter />)

    expect(getByLabelText('Authentication')).toBeChecked()
    expect(getByLabelText('Bank Accounts')).not.toBeChecked()
  })

  it('invokes handleClick', async () => {
    const { getByLabelText } = render(<NotificationsFilter />)

    fireEvent.click(getByLabelText('Authentication'))

    await waitFor(() => {
      expect(hookReturnValues.handleClick).toHaveBeenCalledTimes(1)
      expect(hookReturnValues.handleClick).toHaveBeenCalledWith(
        NotificationFilter.Authentication
      )
    })
  })
})
