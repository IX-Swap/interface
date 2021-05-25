import { Setup2FAGuide } from 'app/pages/security/pages/setup2faguide/Setup2FAGuide'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Setup2FAGuide', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Setup2FAGuide />)
  })

  it('renders __tests__ correctly', () => {
    const { queryAllByAltText, getByText } = render(<Setup2FAGuide />)

    expect(queryAllByAltText('Back to 2FA Setup')).toBeTruthy()
    expect(getByText('How to Set up Two-Factor Authentication?')).toBeTruthy()
  })
})
