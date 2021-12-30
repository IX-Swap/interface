import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import { NotificationFilterFeatures } from 'types/app'
import * as notificationsFilterHook from 'app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationsFilter } from 'app/pages/notifications/components/NotificationsFilter'

describe('NotificationsFilter', () => {
  const hookReturnValues = {
    filter: [NotificationFilterFeatures.Authentication],
    handleClick: jest.fn()
  }
  beforeEach(() => {
    jest
      .spyOn(notificationsFilterHook, 'useNotificationsFilter')
      .mockReturnValue(hookReturnValues)
  })

  afterEach(async () => {
    jest.clearAllMocks()
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
        NotificationFilterFeatures.Authentication
      )
    })
  })
})
