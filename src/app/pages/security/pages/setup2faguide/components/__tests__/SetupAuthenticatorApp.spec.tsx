import { SetupAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/SetupAuthenticatorApp'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SetupAuthenticatorApp', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SetupAuthenticatorApp />)
  })
})
