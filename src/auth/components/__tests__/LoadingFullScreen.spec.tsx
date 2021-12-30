import React from 'react'
import { render } from 'test-utils'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'

describe('LoadingFullScreen', () => {
  it.skip('renders with loading message', async () => {
    const { getByTestId } = render(<LoadingFullScreen />)
    const progress = getByTestId(/progress/i)

    expect(progress).toBeTruthy()
  })
})
