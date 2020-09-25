/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step2Scan } from 'v2/app/pages/security/pages/setup2fa/components/Step2Scan'

describe('Step2Scan', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step2Scan />)
  })
})
