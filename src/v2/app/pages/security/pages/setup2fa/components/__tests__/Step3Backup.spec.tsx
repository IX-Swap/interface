/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step3Backup } from 'v2/app/pages/security/pages/setup2fa/components/Step3Backup'

describe('Step3Backup', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step3Backup />)
  })
})
