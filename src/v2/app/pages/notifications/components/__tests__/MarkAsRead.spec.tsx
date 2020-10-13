/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  MarkAsRead,
  MarkAsReadProps
} from 'v2/app/pages/notifications/components/MarkAsRead'

describe('MarkAsRead', () => {
  const props: MarkAsReadProps = {
    disabled: false,
    onClick: jest.fn()
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MarkAsRead {...props} />)
  })
})
