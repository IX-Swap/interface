import { SetupAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/SetupAuthenticatorApp'
import React from 'react'
import { render } from 'test-utils'

describe('SetupAuthenticatorApp', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SetupAuthenticatorApp />)
  })
})
