import React from 'react'
import { render } from 'test-utils'
import { Step1Download } from 'app/pages/security/pages/setup2fa/components/Step1Download'

describe('Step1Download', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Step1Download />)
  })
})
