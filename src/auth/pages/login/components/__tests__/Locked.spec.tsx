import { Locked } from 'auth/pages/login/components/Locked'
import React from 'react'
import { render, cleanup, waitFor } from 'test-utils'

describe('Locked', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Locked email='email@investax.io' />)
  })

  it('shows initial timer values', () => {
    const { getByText } = render(<Locked email='email@investax.io' />)

    expect(getByText('Resend link again in 00:30s')).toBeTruthy()
  })

  it('shows correct timer values', async () => {
    const { getByText } = render(<Locked email='email@investax.io' />)

    await waitFor(
      () => {
        expect(getByText('Resend link again in 00:29s')).toBeTruthy()
      },
      { timeout: 1000 }
    )
  })
})
