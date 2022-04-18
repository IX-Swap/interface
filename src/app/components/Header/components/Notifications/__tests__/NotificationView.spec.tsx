import React from 'react'
import { render } from 'test-utils'
import { notification } from '__fixtures__/notification'
import { getTimeAgo } from 'helpers/dates'
import {
  getIcon,
  NotificationView,
  NotificationViewProps
} from 'app/components/Header/components/Notifications/NotificationView/NotificationView'
import { ReactComponent as SuccessIcon } from 'assets/icons/alerts/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/alerts/error.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/alerts/info.svg'
import { ReactComponent as WarningIcon } from 'assets/icons/alerts/warning.svg'
import * as useMarkAsReadHook from 'app/pages/notifications/hooks/useMarkAsRead'
import { generateMutationResult } from '__fixtures__/useQuery'
import { fireEvent, waitFor } from '@testing-library/react'

describe('NotificationView', () => {
  const props: NotificationViewProps = {
    data: notification
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders message, subject, createdAt correctly', () => {
    const { container } = render(<NotificationView {...props} />)

    expect(container).toHaveTextContent(notification.subject)
    expect(container).toHaveTextContent(notification.message)
    expect(container).toHaveTextContent(getTimeAgo(notification.createdAt))
  })

  it('invokes useMarkAsRead mutation fn when wrapper is clicked', async () => {
    const mutation = jest.fn()

    jest.spyOn(useMarkAsReadHook, 'useMarkAsRead').mockReturnValue({
      ...generateMutationResult({}),
      mutation
    })

    const { getByTestId } = render(<NotificationView {...props} />)

    fireEvent.click(getByTestId('wrapper'))

    await waitFor(() => {
      expect(mutation).toHaveBeenCalledTimes(1)
    })
  })

  it('not invokes useMarkAsRead mutation fn when wrapper is clicked, isLoading and read prop is true', async () => {
    const mutation = jest.fn()

    jest.spyOn(useMarkAsReadHook, 'useMarkAsRead').mockReturnValue({
      ...generateMutationResult({ isLoading: true }),
      mutation
    })

    const { getByTestId } = render(
      <NotificationView {...{ ...props, read: true }} />
    )

    fireEvent.click(getByTestId('wrapper'))

    await waitFor(() => {
      expect(mutation).toHaveBeenCalledTimes(0)
    })
  })
})

describe('getIcon', () => {
  it('returns correct icon', () => {
    expect(getIcon('success')).toEqual(<SuccessIcon />)
    expect(getIcon('error')).toEqual(<ErrorIcon />)
    expect(getIcon('info')).toEqual(<InfoIcon />)
    expect(getIcon('warning')).toEqual(<WarningIcon />)
  })
})
