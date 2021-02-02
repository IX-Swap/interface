import React from 'react'
import { render, cleanup } from 'test-utils'
import { InstallAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/InstallAuthenticatorApp'

describe('InstallAuthenticationApp', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<InstallAuthenticatorApp />)
  })
})
