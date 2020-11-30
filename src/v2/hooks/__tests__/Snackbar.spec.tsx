import React from 'react'
import { render, cleanup } from 'test-utils'
import { Snackbar, SnackbarProps } from 'v2/hooks/Snackbar'
import { NotificationIcon } from 'v2/app/pages/notifications/components/NotificationIcon'

jest.mock('v2/app/pages/notifications/components/NotificationIcon', () => ({
  NotificationIcon: jest.fn(() => null)
}))

describe('Snackbar', () => {
  const props: SnackbarProps = { message: 'Cool!', variant: 'success' }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Snackbar {...props} />)
  })

  it('renders NotificationIcon with correct props', () => {
    render(<Snackbar {...props} />)

    expect(NotificationIcon).toHaveBeenCalledTimes(1)
    expect(NotificationIcon).toHaveBeenCalledWith({ type: props.variant }, {})
  })
})
