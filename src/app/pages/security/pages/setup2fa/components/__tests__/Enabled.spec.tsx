import React from 'react'
import { render } from 'test-utils'
import { Enabled } from 'app/pages/security/pages/setup2fa/components/Enabled'

describe('Enabled', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Enabled />)
  })
})
