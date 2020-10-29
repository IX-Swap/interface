/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Notification, NotificationProps } from 'v2/components/Notification'

describe('Notification', () => {
  const props: NotificationProps = { key: 'test-key', message: 'Hellow World!' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    const ref = React.createRef()
    render(<Notification ref={ref} {...props} />)
  })
})
