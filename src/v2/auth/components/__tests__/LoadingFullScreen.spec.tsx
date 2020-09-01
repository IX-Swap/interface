/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render } from 'test-utils'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'

describe('LoadingFullScreen', () => {
  it('renders with loading message', async () => {
    const { getByText } = render(<LoadingFullScreen />)
    const message = getByText(/loading/i)

    expect(message).toBeTruthy
  })
})
