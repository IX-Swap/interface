import React from 'react'
import { render } from 'test-utils'
import { Toast, ToastProps } from 'components/Toast'

describe('Notification', () => {
  const props: ToastProps = {
    appearance: 'error',
    autoDismiss: false,
    autoDismissTimeout: 5000,
    children: <div />,
    isRunning: true,
    onDismiss: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    placement: 'bottom-center',
    transitionDuration: 300,
    transitionState: 'entered'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Toast {...props} />)
  })
})
