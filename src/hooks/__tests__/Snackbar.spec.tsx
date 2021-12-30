import React from 'react'
import { render } from 'test-utils'
import { Snackbar, SnackbarProps } from 'hooks/Snackbar'
import { NotificationIcon } from 'app/pages/notifications/components/NotificationIcon'

jest.mock('app/pages/notifications/components/NotificationIcon', () => ({
  NotificationIcon: jest.fn(() => null)
}))

describe('Snackbar', () => {
  const props: SnackbarProps = { message: 'Cool!', variant: 'success' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Snackbar {...props} />)
  })

  it('renders NotificationIcon with correct props', () => {
    render(<Snackbar {...props} />)

    expect(NotificationIcon).toHaveBeenCalledTimes(1)
    expect(NotificationIcon).toHaveBeenCalledWith({ type: props.variant }, {})
  })
})
