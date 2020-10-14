/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  MarkAsRead,
  MarkAsReadProps
} from 'v2/app/pages/notifications/components/MarkAsRead'
import { fireEvent, waitFor } from '@testing-library/react'

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

  it('invokes onClick when button is clicked', async () => {
    const { getByRole } = render(<MarkAsRead {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })
})
