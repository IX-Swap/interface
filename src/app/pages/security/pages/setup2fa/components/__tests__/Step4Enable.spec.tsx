import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step4Enable } from 'app/pages/security/pages/setup2fa/components/Step4Enable'

describe('Step4Enable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step4Enable />)
  })
})
