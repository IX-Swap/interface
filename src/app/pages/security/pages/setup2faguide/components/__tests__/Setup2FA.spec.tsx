import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup2FA } from 'app/pages/security/pages/setup2faguide/components/Setup2FA'

describe('Setup2FA', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Setup2FA />)
  })
})
