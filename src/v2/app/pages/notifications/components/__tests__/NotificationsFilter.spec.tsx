/**  * @jest-environment jsdom-sixteen  */
import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppFeature } from 'v2/types/app'
import * as notificationsFilterHook from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationsFilter } from 'v2/app/pages/notifications/components/NotificationsFilter'

describe('NotificationsFilter', () => {
  const hookReturnValues = {
    filter: [AppFeature.Authentication],
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

  it('invokes handleClick', async () => {
    const { getByLabelText } = render(<NotificationsFilter />)

    fireEvent.click(getByLabelText('Authentication'))

    await waitFor(() => {
      expect(hookReturnValues.handleClick).toHaveBeenCalledTimes(1)
      expect(hookReturnValues.handleClick).toHaveBeenCalledWith(
        AppFeature.Authentication
      )
    })
  })
})
