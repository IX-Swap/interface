import React from 'react'
import { render, cleanup } from 'test-utils'
import { Enabled } from 'app/pages/security/pages/setup2fa/components/Enabled'

describe('Enabled', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Enabled />)
  })
})
