import React from 'react'
import { render } from 'test-utils'
import { InstallAuthenticatorApp } from 'app/pages/security/pages/setup2faguide/components/InstallAuthenticatorApp'

describe('InstallAuthenticationApp', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<InstallAuthenticatorApp />)
  })
})
