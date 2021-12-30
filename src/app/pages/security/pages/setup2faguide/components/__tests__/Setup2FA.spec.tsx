import React from 'react'
import { render } from 'test-utils'
import { Setup2FA } from 'app/pages/security/pages/setup2faguide/components/Setup2FA'

describe('Setup2FA', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Setup2FA />)
  })
})
