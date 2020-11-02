/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Toast, ToastProps } from 'v2/components/Toast'

describe('Notification', () => {
  const props: ToastProps = { key: 'test-key', message: 'Hellow World!' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    const ref = React.createRef()
    render(<Toast ref={ref} {...props} />)
  })
})
