/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render } from 'test-utils'
import { LoadingFullScreen } from 'v2/auth/components/LoadingFullScreen'

describe('LoadingFullScreen', () => {
  it('renders with loading message', async () => {
    const { getByTestId } = render(<LoadingFullScreen />)
    const progress = getByTestId(/progress/i)

    expect(progress).toBeTruthy()
  })
})
