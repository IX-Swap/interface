import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step1Download } from 'app/pages/security/pages/setup2fa/components/Step1Download'

describe('Step1Download', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step1Download />)
  })
})
